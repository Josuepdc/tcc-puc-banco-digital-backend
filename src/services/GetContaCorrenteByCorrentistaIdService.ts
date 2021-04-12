import { getCustomRepository } from 'typeorm';

import ContaCorrente from '../models/ContaCorrente';
import ContaCorrenteRepository from '../repositories/ContaCorrenteRepository';

interface Request {
  correntistaId: number;
}

class GetContaCorrenteByCorrentistaIdService {
  public async execute({ correntistaId }: Request): Promise<ContaCorrente | null> {
    const contaCorrenteRepository = getCustomRepository(ContaCorrenteRepository);

    const findContaCorrente = await contaCorrenteRepository.findByCorrentistaId(correntistaId);

    await findContaCorrente?.correntista;
    await findContaCorrente?.transacoes;

    return findContaCorrente;
  }
}

export default GetContaCorrenteByCorrentistaIdService;
