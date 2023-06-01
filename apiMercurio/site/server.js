const express = require('express');
const server = express()




server.use(express.static('public'))



server.get('/home', (req, res) => {
    res.sendFile(__dirname + '/home/index.html')
});

server.get('/quemSomos', (req, res) => {
    res.sendFile(__dirname + '/quemSomos/quemSomos.html');
});

server.get('/cadastro', (req, res) => {
    res.sendFile(__dirname + '/cadastro/cadastro.html');
});

server.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login/login.html');
});

server.get('/dashBoard', (req, res) => {
    res.sendFile(__dirname + `/dat-acqu-ino/index.html`);
});

server.get('/simulador', (req, res) => {
    res.sendFile(__dirname + `/simulador/simulador.html`);
});

server.get('/cadastroFuncionario', (req, res) => {
    res.sendFile(__dirname + `/cadastroFuncionario/cadFuncionario.html`);
});


server.get('/cadastroFuncionarioInstitucional', (req, res) => {
    res.sendFile(__dirname + `/cadastroFuncionarioInstitucional/cadFuncionarioInstitucional.html`);
});

server.get('/listaSetoresIdeais', (req, res) => {
    res.sendFile(__dirname + `/lista/listaSetoresIdeais.html`);
});

server.get('/listaSetoresAlerta', (req, res) => {
    res.sendFile(__dirname + `/lista/listaSetoresAlerta.html`);
});

server.get('/listaSetoresEmergenciais', (req, res) => {
    res.sendFile(__dirname + `/lista/listaSetoresEmergencial.html`);
});

server.get('/listaSetoresCriticos', (req, res) => {
    res.sendFile(__dirname + `/lista/listaSetoresCritico.html`);
});




server.listen(3300, () => {
    console.log(`Servidor rodando em http://localhost:3300/home`);
});

