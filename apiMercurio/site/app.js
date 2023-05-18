process.env.AMBIENTE_PROCESSO = "desenvolvimento";
// process.env.AMBIENTE_PROCESSO = "producao";

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA = process.env.AMBIENTE_PROCESSO == "desenvolvimento" ? 3300 : 8080;

var app = express();

var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuarios");
var avisosRouter = require("./src/routes/avisos");
var medidasRouter = require("./src/routes/medidas");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "site")));

app.use(cors());

app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);
app.use("/avisos", avisosRouter);
app.use("/medidas", medidasRouter)


app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/home/index.html')
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/home/index.html')
});

app.get('/quemSomos', (req, res) => {
    res.sendFile(__dirname + '/quemSomos/quemSomos.html');
});

app.get('/cadastro', (req, res) => {
    res.sendFile(__dirname + '/cadastro/cadastro.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login/login.html');
});

app.get('/dashBoard', (req, res) => {
    res.sendFile(__dirname + '/dat-acqu-ino/index.html');
});

app.get('/recuperarSenha', (req, res) => {
    res.sendFile(__dirname + `/recuperacaoSenha/userRecuperarSenha.html`);
});

app.get('/NovaSenha', (req, res) => {
    res.sendFile(__dirname + `/novaSenha/novaSenha.html`);
});

app.get('/simulador', (req, res) => {
    res.sendFile(__dirname + `/simulador/simulador.html`);
});

app.get('/cadastroFuncionario', (req, res) => {
    res.sendFile(__dirname + `/cadastroFuncionario/cadFuncionario.html`);
});


 app.get('/cadastroFuncionarioInstitucional', (req, res) => {
res.sendFile(__dirname + `/cadastroFuncionarioInstitucional/cadFuncionarioInstitucional.html`);
});

app.get('/listaSetoresIdeais', (req, res) => {
    res.sendFile(__dirname + `/lista/listaSetoresIdeais.html`);
    });

    app.get('/listaSetoresAlerta', (req, res) => {
        res.sendFile(__dirname + `/lista/listaSetoresAlerta.html`);
        });
    
    app.get('/listaSetoresEmergenciais', (req, res) => {
    res.sendFile(__dirname + `/lista/listaSetoresEmergencial.html`);
    });
    
    app.get('/listaSetoresCriticos', (req, res) => {
    res.sendFile(__dirname + `/lista/listaSetoresCritico.html`);
    });


app.listen(PORTA, function () {
    console.log(`Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar: http://localhost:${PORTA} /n
    Você está rodando sua aplicação em Ambiente de ${process.env.AMBIENTE_PROCESSO} \n
    \t\tSe "desenvolvimento", você está se conectando ao banco LOCAL (MySQL Workbench). \n
    \t\tSe "producao", você está se conectando ao banco REMOTO (SQL Server em nuvem Azure) \n
    \t\t\t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'`);
});
