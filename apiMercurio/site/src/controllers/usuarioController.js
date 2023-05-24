var usuarioModel = require("../models/usuarioModel");

var sessoes = [];

function testar(req, res) {
    console.log("ENTRAMOS NA usuarioController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function listar(req, res) {
    usuarioModel.listar()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function entrar(req, res) {

    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        
        usuarioModel.entrar(email, senha)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                        console.log(resultado[0])
                    } else if (resultado.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nomeUsuario = req.body.nomeServer;
    var emailUsuario = req.body.emailServer;
    var senhaUsuario = req.body.senhaServer;
    var cpfUsuario = req.body.cpfServer;
    var dtNascUsuario = req.body.dtNascimentoServer;
    var nivelUsuario = req.body.nivelUsuarioServer;

    // Faça as validações dos valores
    if (nomeUsuario == undefined || emailUsuario == undefined || senhaUsuario == undefined || cpfUsuario == undefined || dtNascUsuario == undefined) {
        res.status(400).send("Preencha todos os campos");
    } else {
        
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nomeUsuario, senhaUsuario, emailUsuario, nivelUsuario, cpfUsuario, dtNascUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function cadastrarEmpresa(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nomeEmpresa = req.body.nomeEmpresa;
    var cnpjEmpresa = req.body.cnpjEmpresa;
    var emailEmpresa = req.body.emailEmpresa;
    var senhaEmpresa = req.body.senhaEmpresa;
    var porteEmpresa = req.body.porteEmpresa;

    // Faça as validações dos valores
    if (nomeEmpresa == "" || cnpjEmpresa == "" || emailEmpresa == "" || senhaEmpresa == "" || senhaEmpresa == "") {
        res.status(400).send("Preencha todos os campos");
    } else {
        
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrarEmpresa(nomeEmpresa, cnpjEmpresa, emailEmpresa, senhaEmpresa, senhaEmpresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    entrar,
    cadastrar,
    listar,
    testar,
    cadastrarEmpresa
}