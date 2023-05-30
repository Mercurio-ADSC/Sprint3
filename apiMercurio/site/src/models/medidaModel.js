var database = require("../database/config");

function buscarUltimasMedidas(idCaptacao, limite_linhas) {
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

    instrucaoSql = `SELECT DATE_FORMAT(dthCaptacao,'%H:%i') as momento_grafico, 
    SUM(statusCaptacao) as totalCaptacao
    FROM captacao
    JOIN sensor on fkSensor = idSensor
    WHERE captacao.fkSensor = ${idCaptacao} AND sensor.fkSetor = ${idCaptacao}
    GROUP BY DATE_FORMAT(dthCaptacao,'%H:%i') 
    order by momento_grafico 
    LIMIT ${5};`;

  } else {
    console.log(
      "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
    );
    return;
  }

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idCaptacao, limite_linhas) {
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

      instrucaoSql = `SELECT DATE_FORMAT(dthCaptacao,'%H:%i') as momento_grafico, 
      SUM(statusCaptacao) as totalCaptacao
      FROM captacao
      JOIN sensor on fkSensor = idSensor
      WHERE captacao.fkSensor = ${idCaptacao} AND sensor.fkSetor = ${idCaptacao}
      GROUP BY DATE_FORMAT(dthCaptacao,'%H:%i') 
      order by momento_grafico DESC
      LIMIT 1;`;
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
  buscarUltimasMedidas,
  buscarMedidasEmTempoReal,
};
