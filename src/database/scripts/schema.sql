CREATE TABLE correntista (
 id SERIAL,
 nome VARCHAR(255) NOT NULL,
 cpf_cnpj VARCHAR(20) NOT NULL,
 senha VARCHAR(100) NOT NULL,
 rg VARCHAR(20) NOT NULL,
 data_nascimento DATE NOT NULL,
 email VARCHAR(255) NOT NULL,
 telefone VARCHAR(255) NOT NULL
);

ALTER TABLE correntista ADD CONSTRAINT PK_correntista PRIMARY KEY (id);


CREATE TABLE documento (
 id SERIAL,
 arquivo VARCHAR(255) NOT NULL,
 tipo_documento INT NOT NULL,
 ic_correntista INT NOT NULL
);

ALTER TABLE documento ADD CONSTRAINT PK_documento PRIMARY KEY (id);


CREATE TABLE funcionario (
 id SERIAL,
 nome VARCHAR(255) NOT NULL,
 tipo INT NOT NULL
);

ALTER TABLE funcionario ADD CONSTRAINT PK_funcionario PRIMARY KEY (id);


CREATE TABLE transacao_conta_corrente (
 id SERIAL,
 data_hora TIMESTAMP(10) NOT NULL,
 valor DOUBLE PRECISION NOT NULL,
 tipo INT NOT NULL,
 id_conta_corrente INT NOT NULL,
 id_transferencia INT,
 id_pagamento INT
);

ALTER TABLE transacao_conta_corrente ADD CONSTRAINT PK_transacao_conta_corrente PRIMARY KEY (id);


CREATE TABLE transacao_investimento (
 id SERIAL,
 data_hora TIMESTAMP(10) NOT NULL,
 valor DOUBLE PRECISION NOT NULL,
 tipo INT NOT NULL,
 id_investimento INT NOT NULL,
 id_transferencia INT
);

ALTER TABLE transacao_investimento ADD CONSTRAINT PK_transacao_investimento PRIMARY KEY (id);


CREATE TABLE transacao_poupanca (
 id SERIAL,
 data_hora TIMESTAMP(10) NOT NULL,
 valor DOUBLE PRECISION NOT NULL,
 tipo INT NOT NULL,
 id_poupanca INT NOT NULL,
 id_transferencia INT
);

ALTER TABLE transacao_poupanca ADD CONSTRAINT PK_transacao_poupanca PRIMARY KEY (id);


CREATE TABLE transferencia (
 id SERIAL,
 tipo_transferencia INT NOT NULL,
 id_transacao_conta_destino INT,
 id_transacao_poupanca_destino INT,
 id_transacao_investimento_destino INT,
 banco VARCHAR(10),
 agencia VARCHAR(10),
 conta VARCHAR(10)
);

ALTER TABLE transferencia ADD CONSTRAINT PK_transferencia PRIMARY KEY (id);


CREATE TABLE conta_corrente (
 id SERIAL,
 ativo SMALLINT NOT NULL,
 saldo DOUBLE PRECISION NOT NULL,
 id_correntista INT NOT NULL
);

ALTER TABLE conta_corrente ADD CONSTRAINT PK_conta_corrente PRIMARY KEY (id);


CREATE TABLE debito_automatico (
 id SERIAL,
 id_conta_corrente INT NOT NULL
);

ALTER TABLE debito_automatico ADD CONSTRAINT PK_debito_automatico PRIMARY KEY (id);


CREATE TABLE emprestimo (
 id SERIAL,
 id_conta_corrente INT NOT NULL
);

ALTER TABLE emprestimo ADD CONSTRAINT PK_emprestimo PRIMARY KEY (id);


CREATE TABLE investimento (
 id SERIAL,
 saldo DOUBLE PRECISION NOT NULL,
 id_conta_corrente INT NOT NULL
);

ALTER TABLE investimento ADD CONSTRAINT PK_investimento PRIMARY KEY (id);


CREATE TABLE poupanca (
 id SERIAL,
 saldo DOUBLE PRECISION NOT NULL,
 id_conta_corrente INT NOT NULL
);

ALTER TABLE poupanca ADD CONSTRAINT PK_poupanca PRIMARY KEY (id);


CREATE TABLE cartao_de_debito (
 id SERIAL,
 nome VARCHAR(45) NOT NULL,
 numero VARCHAR(45) NOT NULL,
 vencimento TIMESTAMP(10) NOT NULL,
 cvv VARCHAR(10) NOT NULL,
 ativo SMALLINT NOT NULL,
 bloqueado SMALLINT NOT NULL,
 id_conta_corrente INT NOT NULL
);

ALTER TABLE cartao_de_debito ADD CONSTRAINT PK_cartao_de_debito PRIMARY KEY (id);


CREATE TABLE credito (
 id SERIAL,
 limite DOUBLE PRECISION NOT NULL,
 saldo DOUBLE PRECISION NOT NULL,
 vencimento_fatura TIMESTAMP(10) NOT NULL,
 id_debito_automatico INT NOT NULL,
 id_conta_corrente INT NOT NULL
);

ALTER TABLE credito ADD CONSTRAINT PK_credito PRIMARY KEY (id);


CREATE TABLE pagamento (
 id SERIAL,
 tipo INT NOT NULL,
 codigo_boleto VARCHAR(255),
 codigo_imposto INT,
 telefone_recarga VARCHAR(45),
 id_cartao_de_debito INT
);

ALTER TABLE pagamento ADD CONSTRAINT PK_pagamento PRIMARY KEY (id);


CREATE TABLE programa_de_milhas (
 id SERIAL,
 saldo DOUBLE PRECISION NOT NULL,
 id_credito INT NOT NULL
);

ALTER TABLE programa_de_milhas ADD CONSTRAINT PK_programa_de_milhas PRIMARY KEY (id);


CREATE TABLE cartao_de_credito (
 id SERIAL,
 nome VARCHAR(45) NOT NULL,
 numero VARCHAR(45) NOT NULL,
 vencimento TIMESTAMP(10) NOT NULL,
 cvv VARCHAR(10) NOT NULL,
 ativo SMALLINT NOT NULL,
 bloqueado SMALLINT NOT NULL,
 id_credito INT NOT NULL
);

ALTER TABLE cartao_de_credito ADD CONSTRAINT PK_cartao_de_credito PRIMARY KEY (id);


CREATE TABLE transacao_de_credito (
 id SERIAL,
 data_hora TIMESTAMP(10) NOT NULL,
 valor DOUBLE PRECISION NOT NULL,
 parcelas INT NOT NULL,
 id_cartao_de_credito INT NOT NULL,
 id_programa_de_milhas INT NOT NULL
);

ALTER TABLE transacao_de_credito ADD CONSTRAINT PK_transacao_de_credito PRIMARY KEY (id);


ALTER TABLE documento ADD CONSTRAINT FK_documento_0 FOREIGN KEY (ic_correntista) REFERENCES correntista (id);


ALTER TABLE transacao_conta_corrente ADD CONSTRAINT FK_transacao_conta_corrente_0 FOREIGN KEY (id_conta_corrente) REFERENCES conta_corrente (id);
ALTER TABLE transacao_conta_corrente ADD CONSTRAINT FK_transacao_conta_corrente_1 FOREIGN KEY (id_transferencia) REFERENCES transferencia (id);
ALTER TABLE transacao_conta_corrente ADD CONSTRAINT FK_transacao_conta_corrente_2 FOREIGN KEY (id_pagamento) REFERENCES pagamento (id);


ALTER TABLE transacao_investimento ADD CONSTRAINT FK_transacao_investimento_0 FOREIGN KEY (id_investimento) REFERENCES investimento (id);
ALTER TABLE transacao_investimento ADD CONSTRAINT FK_transacao_investimento_1 FOREIGN KEY (id_transferencia) REFERENCES transferencia (id);


ALTER TABLE transacao_poupanca ADD CONSTRAINT FK_transacao_poupanca_0 FOREIGN KEY (id_poupanca) REFERENCES poupanca (id);
ALTER TABLE transacao_poupanca ADD CONSTRAINT FK_transacao_poupanca_1 FOREIGN KEY (id_transferencia) REFERENCES transferencia (id);


ALTER TABLE transferencia ADD CONSTRAINT FK_transferencia_0 FOREIGN KEY (id_transacao_conta_destino) REFERENCES transacao_conta_corrente (id);
ALTER TABLE transferencia ADD CONSTRAINT FK_transferencia_1 FOREIGN KEY (id_transacao_poupanca_destino) REFERENCES transacao_poupanca (id);
ALTER TABLE transferencia ADD CONSTRAINT FK_transferencia_2 FOREIGN KEY (id_transacao_investimento_destino) REFERENCES transacao_investimento (id);


ALTER TABLE conta_corrente ADD CONSTRAINT FK_conta_corrente_0 FOREIGN KEY (id_correntista) REFERENCES correntista (id);


ALTER TABLE debito_automatico ADD CONSTRAINT FK_debito_automatico_0 FOREIGN KEY (id_conta_corrente) REFERENCES conta_corrente (id);


ALTER TABLE emprestimo ADD CONSTRAINT FK_emprestimo_0 FOREIGN KEY (id_conta_corrente) REFERENCES conta_corrente (id);


ALTER TABLE investimento ADD CONSTRAINT FK_investimento_0 FOREIGN KEY (id_conta_corrente) REFERENCES conta_corrente (id);


ALTER TABLE poupanca ADD CONSTRAINT FK_poupanca_0 FOREIGN KEY (id_conta_corrente) REFERENCES conta_corrente (id);


ALTER TABLE cartao_de_debito ADD CONSTRAINT FK_cartao_de_debito_0 FOREIGN KEY (id_conta_corrente) REFERENCES conta_corrente (id);


ALTER TABLE credito ADD CONSTRAINT FK_credito_0 FOREIGN KEY (id_debito_automatico) REFERENCES debito_automatico (id);
ALTER TABLE credito ADD CONSTRAINT FK_credito_1 FOREIGN KEY (id_conta_corrente) REFERENCES conta_corrente (id);


ALTER TABLE pagamento ADD CONSTRAINT FK_pagamento_0 FOREIGN KEY (id_cartao_de_debito) REFERENCES cartao_de_debito (id);


ALTER TABLE programa_de_milhas ADD CONSTRAINT FK_programa_de_milhas_0 FOREIGN KEY (id_credito) REFERENCES credito (id);


ALTER TABLE cartao_de_credito ADD CONSTRAINT FK_cartao_de_credito_0 FOREIGN KEY (id_credito) REFERENCES credito (id);


ALTER TABLE transacao_de_credito ADD CONSTRAINT FK_transacao_de_credito_0 FOREIGN KEY (id_cartao_de_credito) REFERENCES cartao_de_credito (id);
ALTER TABLE transacao_de_credito ADD CONSTRAINT FK_transacao_de_credito_1 FOREIGN KEY (id_programa_de_milhas) REFERENCES programa_de_milhas (id);


