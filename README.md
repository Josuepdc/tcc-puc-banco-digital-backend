<h3 align="center">
  TCC PUC BANCO DIGITAL BACKEND
</h3>

<p align="center">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">
</p>

## Sobre

Implementação de projeto para entrega de TCC da Pós-Graduação.

## Instruções de execução

- Crie um container do banco de dados no docker com: `docker run --name banco_digital_postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres`

- Instale o DBeaver ou o Postbird para acessar o banco.

- Acesse com usuario "postgres" e senha "docker" na porta 5432.

- Crie o banco de dados "banco_digital" pelo DBeaver (sempre em UTF-8).

- Execute o script "./src/database/scripts/schema.sql" para montar o schema inicial do banco.

- Execute o script "./src/database/scripts/seeds.sql" para popular o banco com dados de teste.

- Execute o projeto no terminal com o comando: `yarn dev:server`
