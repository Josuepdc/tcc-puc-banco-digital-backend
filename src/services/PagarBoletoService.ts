import ConsultarBoletoService from "./ConsultarBoletoService";
import { getCustomRepository, Transaction } from "typeorm";
import ContaCorrenteRepository from "../repositories/ContaCorrenteRepository";
import PagamentoRepository from "../repositories/PagamentoRepository";
import TransacaoContaCorrenteRepository from "../repositories/TransacaoContaCorrenteRepository";
import { TipoPagamento } from "../models/Pagamento";
import { TipoTransacao } from "../models/TransacaoContaCorrente";

interface Request {
  correntistaId: number;
  codigoBoleto: string;
}

class PagarBoletoService {
  public async execute({ correntistaId, codigoBoleto }: Request): Promise<boolean> {
    if (!codigoBoleto) {
      throw { message: "Código de boleto obrigatório!" };
    }

    const consultarBoletoService = new ConsultarBoletoService();
    const contaCorrenteRepository = getCustomRepository(ContaCorrenteRepository);
    const pagamentoRepository = getCustomRepository(PagamentoRepository);
    const transacaoContaCorrenteRepository = getCustomRepository(TransacaoContaCorrenteRepository);

    const findContaCorrente = await contaCorrenteRepository.findByCorrentistaId(
      correntistaId,
    );

    if (!findContaCorrente) {
      throw { message: "Conta corrente não encontrada!" };
    }

    const boleto = await consultarBoletoService.execute({
      correntistaId,
      codigoBoleto,
    });

    if (findContaCorrente.saldo - boleto.valor < 0) {
      throw { message: "Saldo insuficiente!" };
    }

    const pagamento = pagamentoRepository.create({
      tipo: TipoPagamento.BOLETO,
      codigo_boleto: codigoBoleto,
    });
    await pagamentoRepository.save(pagamento);

    const transacao = transacaoContaCorrenteRepository.create({
      data_hora: new Date(),
      valor: boleto.valor,
      tipo: TipoTransacao.PAGAMENTO,
      id_conta_corrente: findContaCorrente.id,
      pagamento,
    });
    await transacaoContaCorrenteRepository.save(transacao);

    findContaCorrente.saldo -= boleto.valor;
    await contaCorrenteRepository.save(findContaCorrente);

    return true;
  }
}

export default PagarBoletoService;
