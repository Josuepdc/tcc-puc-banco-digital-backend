import { Router } from 'express';
import contaCorrenteRouter from './contaCorrente.routes';
import transferenciaRouter from './transferencia.routes';
import pagamentoRouter from './pagamento.routes';

const routes = Router();

routes.use('/contaCorrente', contaCorrenteRouter);
routes.use('/transferencia', transferenciaRouter);
routes.use('/pagamento', pagamentoRouter);

export default routes;
