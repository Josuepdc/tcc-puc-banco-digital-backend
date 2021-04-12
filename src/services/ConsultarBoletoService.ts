
interface Request {
  correntistaId: number;
  codigoBoleto: string;
}

interface Boleto {
  beneficiario: string;
  valor: number;
  vencimento: Date;
}

class ConsultarBoletoService {
  public async execute({ correntistaId, codigoBoleto }: Request): Promise<Boleto> {
    if (!codigoBoleto) {
      throw { message: "Código de boleto obrigatório!" };
    }

    const boletoMock = {
      beneficiario: 'Lorem Ipsum',
      valor: 250.00,
      vencimento: new Date(2025,7,7),
    };

    return boletoMock;
  }
}

export default ConsultarBoletoService;
