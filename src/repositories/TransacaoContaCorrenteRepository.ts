import { EntityRepository, Repository } from 'typeorm';

import TransacaoContaCorrente from '../models/TransacaoContaCorrente';

@EntityRepository(TransacaoContaCorrente)
class TransacaoContaCorrenteRepository extends Repository<TransacaoContaCorrente> {
  
}

export default TransacaoContaCorrenteRepository;
