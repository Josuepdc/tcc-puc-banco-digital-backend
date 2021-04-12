import { Router } from 'express';

import CriarTransferenciaLocalService from '../services/CriarTransferenciaLocalService';
import ConsultarBoletoService from '../services/ConsultarBoletoService';
import PagarBoletoService from '../services/PagarBoletoService';

const pagamentoRouter = Router();

pagamentoRouter.post('/boleto/consultar', async (request, response) => {
  try {
    const { correntista_id } = request.headers;
    const { codigoBoleto } = request.body;

    const consultarBoletoService = new ConsultarBoletoService();

    const boleto = await consultarBoletoService.execute({
      correntistaId: correntista_id && typeof correntista_id == 'string' ? parseInt(correntista_id) : 0,
      codigoBoleto,
    });

    response.json(boleto);
  } catch (err) {
    response.status(400).json({ error: err.message });
  }
});

pagamentoRouter.post('/boleto/pagar', async (request, response) => {
  try {
    const { correntista_id } = request.headers;
    const { codigoBoleto } = request.body;

    const pagarBoletoService = new PagarBoletoService();

    await pagarBoletoService.execute({
      correntistaId: correntista_id && typeof correntista_id == 'string' ? parseInt(correntista_id) : 0,
      codigoBoleto,
    });

    response.json(true);
  } catch (err) {
    response.status(400).json({ error: err.message });
  }
});

export default pagamentoRouter;
