import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import ContaCorrente from './ContaCorrente';
import TransacaoContaCorrente from './TransacaoContaCorrente';

export enum TipoTransferencia {
  TEF = 0,
  DOC = 1,
  TED = 2,
}

@Entity('transferencia')
class Transferencia {
  @PrimaryGeneratedColumn()
  id: number;
  
  @OneToOne(() => TransacaoContaCorrente, transacaoContaOrigem => transacaoContaOrigem.transferencia)
  transacaoContaOrigem: TransacaoContaCorrente;

  @Column()
  tipo_transferencia: TipoTransferencia;

  @Column()
  id_transacao_conta_destino: number | null;
  
  @OneToOne(() => TransacaoContaCorrente, transacaoContaOrigem => transacaoContaOrigem.transferencia, { lazy: true })
  @JoinColumn({ name: 'id_transacao_conta_destino' })
  transacaoContaDestino: TransacaoContaCorrente | null;

  // Outro caso de uso
  // @Column()
  // id_transacao_poupanca_destino: number | null;

  // @Column()
  // id_transacao_investimento_destino: number | null;
}

export default Transferencia;
