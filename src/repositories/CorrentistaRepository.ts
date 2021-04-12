import { EntityRepository, Repository } from 'typeorm';

import Correntista from '../models/Correntista';

@EntityRepository(Correntista)
class CorrentistaRepository extends Repository<Correntista> {
  public async findByCpfCnpj(cpfCnpj: string): Promise<Correntista | null> {
    const findCorrentista = await this.findOne({
      where: { cpf_cnpj: cpfCnpj },
    });

    return findCorrentista || null;
  }
}

export default CorrentistaRepository;
