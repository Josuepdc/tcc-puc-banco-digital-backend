INSERT INTO correntista (id, nome, cpf_cnpj, senha, rg, data_nascimento, email, telefone)
VALUES (1, 'Usuário de Teste 1', '11111111111', '-', '111111111', '01/01/2000', 'teste@email.com', '11111111');

INSERT INTO correntista (id, nome, cpf_cnpj, senha, rg, data_nascimento, email, telefone)
VALUES (2, 'Usuário de Teste 2', '22222222222', '-', '222222222', '01/01/2000', 'teste2@email.com', '22222222');

INSERT INTO conta_corrente (id, ativo, saldo, id_correntista)
VALUES (1, 1, 10000, 1);

INSERT INTO conta_corrente (id, ativo, saldo, id_correntista)
VALUES (2, 1, 20000, 2);