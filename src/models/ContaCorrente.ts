import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import Correntista from './Correntista';
import TransacaoContaCorrente from './TransacaoContaCorrente';

@Entity('conta_corrente')
class ContaCorrente {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  ativo: boolean;

  @Column()
  saldo: number;

  @Column()
  id_correntista: number;
  
  @OneToOne(() => Correntista, correntista => correntista.contaCorrente, { lazy: true })
  @JoinColumn({ name: 'id_correntista' })
  correntista: Correntista;

  @OneToMany(() => TransacaoContaCorrente, transacoes => transacoes.contaCorrente, { lazy: true })
  transacoes: TransacaoContaCorrente[];
}

export default ContaCorrente;
