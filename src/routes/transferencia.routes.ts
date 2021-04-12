import { Router } from 'express';

import CriarTransferenciaLocalService from '../services/CriarTransferenciaLocalService';
import { getCustomRepository } from 'typeorm';
import CorrentistaRepository from '../repositories/correntistaRepository';
import CheckCorrentistaByCpfCnpjService from '../services/CheckCorrentistaByCpfCnpjService';

const transferenciaRouter = Router();

transferenciaRouter.post('/check/cpf_cnpj', async (request, response) => {
  try {
    const { cpfCnpj } = request.body;

    const checkCorrentistaByCpfCnpjService = new CheckCorrentistaByCpfCnpjService();

    const result = await checkCorrentistaByCpfCnpjService.execute({
      cpfCnpj,
    });

    response.json(result);
  } catch (err) {
    response.status(400).json({ error: err.message });
  }
});

transferenciaRouter.post('/local', async (request, response) => {
  try {
    const { correntista_id } = request.headers;
    const { valor, cpfCnpj } = request.body;

    const transferenciaLocalService = new CriarTransferenciaLocalService();

    await transferenciaLocalService.execute({
      correntistaId: correntista_id && typeof correntista_id == 'string' ? parseInt(correntista_id) : 0,
      valor: parseInt(valor), 
      cpfCnpj,
    });

    response.json(true);
  } catch (err) {
    response.status(400).json({ error: err.message });
  }
});

export default transferenciaRouter;
