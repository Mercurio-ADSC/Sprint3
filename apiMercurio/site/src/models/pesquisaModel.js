var database = require("../database/config");

function pesquisaFechamentoMes(fkSetor, mes) {
    instrucaoSql = "";

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top ${limite_linhas}
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        momento,
                        FORMAT(momento, 'HH:mm:ss') as momento_grafico
                    from medida
                    where fk_aquario = ${idCaptacao}
                    order by id desc`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {

        instrucaoSql = `  SELECT YEAR(captacao.dthCaptacao) AS ano, SUM(captacao.statusCaptacao) AS totalCaptacao
FROM captacao
INNER JOIN sensor ON captacao.fkSensor = sensor.idSensor
WHERE sensor.fkSetor = ${fkSetor}
  AND YEAR(captacao.dthCaptacao) IN (YEAR(CURRENT_DATE), YEAR(CURRENT_DATE) - 1)
  AND MONTH(captacao.dthCaptacao) = ${mes}
GROUP BY YEAR(captacao.dthCaptacao);`;

    } else {
        console.log(
            "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
        );
        return;
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function pesquisaDataEspecial(fkSetor, data) {
    instrucaoSql = "";

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 1
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        CONVERT(varchar, momento, 108) as momento_grafico, 
                        fk_aquario 
                        from captacao where fk_aquario = ${idCaptacao} 
                    order by id desc`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql =

            instrucaoSql = `SELECT YEAR(captacao.dthCaptacao) as ano, DAY(captacao.dthCaptacao) AS dia, MONTH(captacao.dthCaptacao) AS mes, SUM(captacao.statusCaptacao) AS totalCaptacao
FROM captacao
INNER JOIN sensor ON captacao.fkSensor = sensor.idSensor
WHERE sensor.fkSetor = ${fkSetor}
  AND YEAR(captacao.dthCaptacao) IN (YEAR(CURRENT_DATE), YEAR(CURRENT_DATE) - 1)
  AND DATE_FORMAT(captacao.dthCaptacao, '%m-%d') = '${data}'
GROUP BY DAY(captacao.dthCaptacao), MONTH(captacao.dthCaptacao), YEAR(captacao.dthCaptacao);`;
    } else {
        console.log(
            "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
        );
        return;
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    pesquisaDataEspecial,
    pesquisaFechamentoMes,
};
