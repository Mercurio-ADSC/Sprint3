var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas/:idCaptacao", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/tempo-real/:idCaptacao", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
})
router.get("/tempo-real-disparos/:idCaptacao", function (req, res) {
    medidaController.buscarMedidasEmTempoRealDisparos(req, res);
})

module.exports = router;