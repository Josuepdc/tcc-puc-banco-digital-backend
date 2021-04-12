import { EntityRepository, Repository } from 'typeorm';

import Transferencia from '../models/Transferencia';

@EntityRepository(Transferencia)
class TransferenciaRepository extends Repository<Transferencia> {
  
}

export default TransferenciaRepository;
