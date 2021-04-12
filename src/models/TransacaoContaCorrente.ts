import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import ContaCorrente from './ContaCorrente';
import Transferencia from './Transferencia';
import Pagamento from './Pagamento';

export enum TipoTransacao {
  ENVIO_TRANSFERENCIA = 0,
  RECEBIMENTO_TRANSFERENCIA = 1,
  PAGAMENTO = 2,
  DEPOSITO = 3,
}

@Entity('transacao_conta_corrente')
class TransacaoContaCorrente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('timestamp')
  data_hora: Date;

  @Column()
  valor: number;

  @Column()
  tipo: TipoTransacao;

  @Column()
  id_conta_corrente: number;
  
  @ManyToOne(() => ContaCorrente, contaCorrente => contaCorrente.transacoes, { lazy: true })
  @JoinColumn({ name: 'id_conta_corrente' })
  contaCorrente: ContaCorrente;

  @Column()
  id_transferencia: number | null;
  
  @OneToOne(() => Transferencia, transferencia => transferencia.transacaoContaOrigem, { lazy: true })
  @JoinColumn({ name: 'id_transferencia' })
  transferencia: Transferencia | null;

  @Column()
  id_pagamento: number | null;
  
  @OneToOne(() => Pagamento, pagamento => pagamento.transacaoContaOrigem, { lazy: true })
  @JoinColumn({ name: 'id_pagamento' })
  pagamento: Pagamento | null;

  @OneToOne(() => Transferencia, transferencia => transferencia.transacaoContaDestino, { lazy: true })
  transferenciaRecebida: Transferencia | null;
}

export default TransacaoContaCorrente;
