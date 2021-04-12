import { EntityRepository, Repository } from 'typeorm';

import ContaCorrente from '../models/ContaCorrente';

@EntityRepository(ContaCorrente)
class ContaCorrenteRepository extends Repository<ContaCorrente> {
  public async findByCorrentistaId(correntistaId: number): Promise<ContaCorrente | null> {
    const findContaCorrente = await this.findOne({
      where: { id_correntista: correntistaId },
    });

    return findContaCorrente || null;
  }
}

export default ContaCorrenteRepository;
