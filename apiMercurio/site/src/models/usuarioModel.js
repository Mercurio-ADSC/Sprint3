var database = require("../database/config")

function listar() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT * FROM usuario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function entrar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
    SELECT usuario.*,  empresa.emailEmpresa, empresa.razaoSocial, empresa.cnpjEmpresa
    FROM usuario
    LEFT JOIN empresa ON empresa.idEmpresa = usuario.fkEmpresa
    WHERE usuario.emailUsuario = '${email}' AND usuario.senhaUsuario = '${senha}'
    UNION
    SELECT NULL AS idUsuario, NULL AS nomeUsuario, NULL AS senhaUsuario, NULL AS emailUsuario, NULL AS nivelUsuario, NULL AS cpfUsuario, NULL AS dtNascUsuario, empresa.idEmpresa, empresa.emailEmpresa, empresa.razaoSocial, empresa.cnpjEmpresa
    FROM empresa
    WHERE empresa.emailEmpresa = '${email}' AND empresa.senhaEmpresa = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nomeUsuario, senhaUsuario, emailUsuario, nivelUsuario, cpfUsuario, dtNascUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nomeUsuario, senhaUsuario, emailUsuario, nivelUsuario, cpfUsuario, dtNascUsuario);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO usuario (nomeUsuario, senhaUsuario, emailUsuario, nivelUsuario, cpfusuario, dtNascUsuario) VALUES ('${nomeUsuario}', '${senhaUsuario}', '${emailUsuario}', '${nivelUsuario}', '${cpfUsuario}', '${dtNascUsuario}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarEmpresa(nomeEmpresa, cnpjEmpresa, emailEmpresa, senhaEmpresa, porteEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarEmpresa():", nomeEmpresa, cnpjEmpresa, emailEmpresa, senhaEmpresa, porteEmpresa);

    var instrucao = `
        INSERT INTO empresa (razaoSocial, cnpjEmpresa, porteEmpresa, emailEmpresa, senhaEmpresa) VALUES ('${nomeEmpresa}', '${cnpjEmpresa}', '${porteEmpresa}', '${emailEmpresa}', '${senhaEmpresa}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    entrar,
    cadastrar,
    listar,
    cadastrarEmpresa
};