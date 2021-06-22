import ContaModel from '../db/models/conta.model'
import { taxaDeSaque } from '../utils/constants'

// mensagens de status
const STATUS = {
  success: 'success',
  error: 'error'
}

/* Função que gerencia o deposito. 
Recebe o id da conta como parametro na rota. 
Recebe valor no corpo da requisição */
export async function deposito(req, res) {
  const id = req.params.id
  let valorDepositado = req.body.valor

  try {
    const conta = await ContaModel.findById(id)

    const novoSaldo = conta.saldo + valorDepositado
    // atualiza e retorna a conta no banco de dados
    const updatedConta = await ContaModel
      .findOneAndUpdate(
        { _id: id },
        { saldo: novoSaldo },
        { new: true } // retorna o objeto modificado
      )
    res.json({
      status: STATUS.success,
      updatedConta
    })
  } catch (err) {
    res.json({
      status: STATUS.error,
      msg: err.message
    })
  }
}

/* Função que gerencia o saque.
Recebe o id da conta como parametro na rota.
Recebe valor no corpo da requisição */
export async function saque(req, res) {
  const id = req.params.id
  let valorSacado = req.body.valor

  try {
    const conta = await ContaModel.findById(id)

    // subtrai o valor e a taxa de transação do saldo
    const novoSaldo = conta.saldo - valorSacado - taxaDeSaque

    // Interrompe a operação e lança uma mensagem de erro
    // se o valor for negativo ou maior que B$600.00
    if (novoSaldo < 0 || valorSacado > 600) {
      throw new Error('Valor maior que o saldo ou maior que B$600,00')
    }

    const updatedConta = await ContaModel
      .findOneAndUpdate(
        { _id: id },
        { saldo: novoSaldo },
        { new: true } // retorna o objeto modificado
      )
    res.json({
      status: STATUS.success,
      updatedConta
    })
  } catch (err) {
    res.json({
      status: STATUS.error,
      msg: err.message
    })
  }
}