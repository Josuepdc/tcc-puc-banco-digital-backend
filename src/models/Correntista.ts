import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import ContaCorrente from './ContaCorrente';

@Entity('correntista')
class Correntista {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  nome: string;
  
  @Column()
  cpf_cnpj: string;

  @OneToOne(() => ContaCorrente, contaCorrente => contaCorrente.correntista, { lazy: true })
  contaCorrente: ContaCorrente;
}

export default Correntista;
