import { Router } from 'express';

import GetContaCorrenteByCorrentistaIdService from '../services/GetContaCorrenteByCorrentistaIdService';

const contaCorrenteRouter = Router();

contaCorrenteRouter.get('/', async (request, response) => {
  try {
    const { correntista_id } = request.headers;

    const getContaCorrenteByCorrentistaIdService = new GetContaCorrenteByCorrentistaIdService();

    const contaCorrente = await getContaCorrenteByCorrentistaIdService.execute({
      correntistaId: correntista_id && typeof correntista_id == 'string' ? parseInt(correntista_id) : 0,
    });

    response.json(contaCorrente);
  } catch (err) {
    response.status(400).json({ error: err.message });
  }
});

export default contaCorrenteRouter;
