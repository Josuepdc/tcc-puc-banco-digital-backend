import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import ContaCorrente from './ContaCorrente';
import TransacaoContaCorrente from './TransacaoContaCorrente';

export enum TipoPagamento {
  BOLETO = 0,
  IMPOSTO = 1,
  RECARGA_DE_CELULAR = 2,
  CARTAO_DE_DEBITO = 3,
  DEBITO_AUTOMATICO = 4,
}

export enum TipoImposto {
  DARF = 0,
  GPS = 1,
  GRU = 2,
}

@Entity('pagamento')
class Pagamento {
  @PrimaryGeneratedColumn()
  id: number;
  
  @OneToOne(() => TransacaoContaCorrente, transacaoContaOrigem => transacaoContaOrigem.transferencia)
  transacaoContaOrigem: TransacaoContaCorrente;

  @Column()
  tipo: TipoPagamento;

  @Column()
  codigo_boleto: string;

  @Column()
  codigo_imposto: TipoImposto;

  @Column()
  telefone_recarga: string;

  // Outro caso de uso
  // @Column()
  // id_cartao_de_debito: number;
}

export default Pagamento;
