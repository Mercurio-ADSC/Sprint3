var express = require("express");
var router = express.Router();

var pesquisaController = require("../controllers/pesquisaController");

router.post("/pesquisaFechamentoMes", function (req, res) {

    pesquisaController.pesquisaFechamentoMes(req, res);
});

router.post("/pesquisaDataEspecial", function (req, res) {
    pesquisaController.pesquisaDataEspecial(req, res);
})

module.exports = router;