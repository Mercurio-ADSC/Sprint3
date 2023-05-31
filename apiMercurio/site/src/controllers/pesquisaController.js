var pesquisaModel = require("../models/pesquisaModel");

function pesquisaFechamentoMes(req, res) {

    var setor = req.body.setor;
    var mes = req.body.mes;
    var fkSetor = 0;

    //validacao do setor escolhido
    if (setor = "Padaria") {
        fkSetor = 1;
    }

    pesquisaModel.pesquisaFechamentoMes(fkSetor, mes).then(function (resultado) {

        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }

    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas pesquisas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);

    });
}


function pesquisaDataEspecial(req, res) {

    var setor = req.body.setor;
    var data = req.body.data;
    var fkSetor = 0;

    //validacao do setor escolhido
    if (setor = "Padaria") {
        fkSetor = 1;
    }

    console.log(`Recuperando pesquisas em tempo real`);

    pesquisaModel.pesquisaDataEspecial(fkSetor, data).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas pesquisas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    pesquisaDataEspecial,
    pesquisaFechamentoMes

}