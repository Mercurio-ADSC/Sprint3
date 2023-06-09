-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql - banco local - ambiente de desenvolvimento
*/

CREATE DATABASE mercurio;
USE mercurio;

CREATE TABLE empresa
(
	idEmpresa INT AUTO_INCREMENT PRIMARY KEY,
    razaoSocial VARCHAR(50),
    cnpjEmpresa VARCHAR(18),
    porteEmpresa VARCHAR(20)
);

CREATE TABLE espaco
(
	idSetor INT AUTO_INCREMENT PRIMARY KEY,
	setor VARCHAR(50),
    fkEmpresa INT,
    CONSTRAINT FOREIGN KEY(fkEmpresa) REFERENCES empresa(idEmpresa)
);

CREATE TABLE usuario
(
	idUsuario INT AUTO_INCREMENT PRIMARY KEY,
	nomeUsuario VARCHAR(50),
    senhaUsuario VARCHAR(20),
    emailUsuario VARCHAR(30),
    nivelUsuario VARCHAR(20),
    cpfusuario VARCHAR(11),
    dtNascUsuario DATE,
    fkEmpresa INT,
    CONSTRAINT FOREIGN KEY(fkEmpresa) REFERENCES empresa(idEmpresa)
);

CREATE TABLE sensor
(
	idSensor INT AUTO_INCREMENT PRIMARY KEY,
    fkSetor INT,
    CONSTRAINT FOREIGN KEY(fkSetor) REFERENCES espaco(idSetor)
);

CREATE TABLE captacao
(
	idCaptacao INT AUTO_INCREMENT PRIMARY KEY,
    dthCaptacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    statusCaptacao TINYINT,
    fkSensor INT,
    CONSTRAINT FOREIGN KEY(fkSensor) REFERENCES sensor(idSensor)
);

/* teste do script

use mercurio;
select * from usuario;

desc captacao;

select * from espaco;

desc sensor;

insert into empresa values 
(null, 'teste', '12345678941', 'pequeno');

insert into espaco values
(null, 'higiene', 1);

insert into sensor values
(null, 1);

update captacao set fkSensor = 1 where idCaptacao in(1, 2, 3, 4, 5, 6, 7);
                                
SELECT SUM(captacao.statusCaptacao) as totalCaptacao, DATE_FORMAT(captacao.dthCaptacao,'%H:%i:%s') as horaCaptacao, sensor.fkSetor 
FROM captacao 
JOIN sensor ON captacao.fkSensor = sensor.idSensor 
JOIN espaco ON espaco.idSetor = sensor.fkSetor 
WHERE captacao.fkSensor = 1 AND sensor.fkSetor = 1 
GROUP BY(sensor.fkSetor, DATE_FORMAT(captacao.dthCaptacao,'%H:%i:%s')) 
ORDER BY captacao.idCaptacao DESC 
LIMIT 7;


select sum(statusCaptacao) from captacao;

*/





/*
comando para sql server - banco remoto - ambiente de produção
*/

-- CREATE TABLE usuario (
-- 	id INT PRIMARY KEY IDENTITY(1,1),
-- 	nome VARCHAR(50),
-- 	email VARCHAR(50),
-- 	senha VARCHAR(50),
-- );

-- CREATE TABLE aviso (
-- 	id INT PRIMARY KEY IDENTITY(1,1),
-- 	titulo VARCHAR(100),
-- 	descricao VARCHAR(150),
-- 	fk_usuario INT FOREIGN KEY REFERENCES usuario(id)
-- );

-- create table aquario (
-- /* em nossa regra de negócio, um aquario tem apenas um sensor */
-- 	id INT PRIMARY KEY IDENTITY(1,1),
-- 	descricao VARCHAR(300)
-- );

-- /* esta tabela deve estar de acordo com o que está em INSERT de sua API do arduino - dat-acqu-ino */

-- CREATE TABLE medida (
-- 	id INT PRIMARY KEY IDENTITY(1,1),
-- 	dht11_umidade DECIMAL,
-- 	dht11_temperatura DECIMAL,
-- 	luminosidade DECIMAL,
-- 	lm35_temperatura DECIMAL,
-- 	chave TINYINT,
-- 	momento DATETIME,
-- 	fk_aquario INT FOREIGN KEY REFERENCES aquario(id)
-- );

-- /*
-- comandos para criar usuário em banco de dados azure, sqlserver,
-- com permissão de insert + update + delete + select
-- */

-- CREATE USER [usuarioParaAPIWebDataViz_datawriter_datareader]
-- WITH PASSWORD = '#Gf_senhaParaAPIWebDataViz',
-- DEFAULT_SCHEMA = dbo;

-- EXEC sys.sp_addrolemember @rolename = N'db_datawriter',
-- @membername = N'usuarioParaAPIWebDataViz_datawriter_datareader';

-- EXEC sys.sp_addrolemember @rolename = N'db_datareader',
-- @membername = N'usuarioParaAPIWebDataViz_datawriter_datareader';
