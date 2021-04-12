import { getCustomRepository } from 'typeorm';

import CorrentistaRepository from '../repositories/correntistaRepository';

interface Request {
  cpfCnpj: string;
}

class CheckCorrentistaByCpfCnpjService {
  public async execute({ cpfCnpj }: Request): Promise<boolean | null> {
    const correntistaRepository = getCustomRepository(CorrentistaRepository);

    const findCorrentista = await correntistaRepository.findByCpfCnpj(cpfCnpj)

    return Boolean(findCorrentista);
  }
}

export default CheckCorrentistaByCpfCnpjService;
