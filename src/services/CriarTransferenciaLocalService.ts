import { getCustomRepository, Transaction } from 'typeorm';

import ContaCorrente from '../models/ContaCorrente';
import ContaCorrenteRepository from '../repositories/ContaCorrenteRepository';
import TransacaoContaCorrenteRepository from '../repositories/TransacaoContaCorrenteRepository';
import { TipoTransacao } from '../models/TransacaoContaCorrente';
import TransferenciaRepository from '../repositories/TransferenciaRepository';
import { TipoTransferencia } from '../models/Transferencia';
import CorrentistaRepository from '../repositories/correntistaRepository';

interface Request {
  correntistaId: number;
  valor: number;
  cpfCnpj: string;
}

enum TipoConta {
  CONTA_CORRENTE = 0,
  CONTA_POUPANCA = 1,
  CONTA_INVESTIMENTO = 2,
}

class CriarTransferenciaLocalService {
  public async execute({ correntistaId, valor, cpfCnpj }: Request): Promise<boolean> {
    const contaCorrenteRepository = getCustomRepository(ContaCorrenteRepository);
    const transacaoContaCorrenteRepository = getCustomRepository(TransacaoContaCorrenteRepository);
    const transferenciaRepository = getCustomRepository(TransferenciaRepository);
    const correntistaRepository = getCustomRepository(CorrentistaRepository);

    const findCorrentistaDestino = await correntistaRepository.findByCpfCnpj(cpfCnpj)

    const contaCorrenteOrigem = await contaCorrenteRepository.findByCorrentistaId(correntistaId);
    let contaCorrenteDestino;
    let transferencia;

    if (!contaCorrenteOrigem) {
      throw { message: "Conta origem não encontrada!" };
    }

    if (contaCorrenteOrigem.id_correntista !== correntistaId) {
      throw { message: "Correntista não é dono da conta!" };
    }

    if (!valor || valor <= 0) {
      throw { message: "Valor precisa ser maior que 0!" };
    }

    if (contaCorrenteOrigem.saldo - valor < 0) {
      throw { message: "Saldo insuficiente!" };
    }
    
    contaCorrenteDestino = await contaCorrenteRepository.findOne({ where: { id_correntista: findCorrentistaDestino?.id }});
    
    if (!contaCorrenteDestino) {
      throw { message: "Conta destino não encontrada!" };
    }
    
    const transacaoContaCorrenteDestino = transacaoContaCorrenteRepository.create({ 
      data_hora: new Date(),
      valor,
      tipo: TipoTransacao.RECEBIMENTO_TRANSFERENCIA,
      id_conta_corrente: contaCorrenteDestino.id,
    });
    await transacaoContaCorrenteRepository.save(transacaoContaCorrenteDestino);
    
    transferencia = transferenciaRepository.create({ 
      tipo_transferencia: TipoTransferencia.TEF,
      id_transacao_conta_destino: transacaoContaCorrenteDestino.id,
    });
    await transferenciaRepository.save(transferencia);

    contaCorrenteDestino.saldo += valor;
    await contaCorrenteRepository.save(contaCorrenteDestino);

    const transacaoContaCorrenteOrigem = transacaoContaCorrenteRepository.create({ 
      data_hora: new Date(),
      valor,
      tipo: TipoTransacao.ENVIO_TRANSFERENCIA,
      id_conta_corrente: contaCorrenteOrigem.id,
      transferencia,
    });
    await transacaoContaCorrenteRepository.save(transacaoContaCorrenteOrigem);

    contaCorrenteOrigem.saldo -= valor;
    await contaCorrenteRepository.save(contaCorrenteOrigem);

    return true;
  }
}

export default CriarTransferenciaLocalService;
