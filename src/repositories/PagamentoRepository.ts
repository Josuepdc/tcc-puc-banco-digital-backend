import { EntityRepository, Repository } from 'typeorm';

import Pagamento from '../models/Pagamento';

@EntityRepository(Pagamento)
class PagamentoRepository extends Repository<Pagamento> {
  
}

export default PagamentoRepository;
