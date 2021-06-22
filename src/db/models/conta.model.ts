import { Schema, model, Types } from 'mongoose'

interface ContaI {
  tipoDeConta: string;
  saldo: number;
}

// esquema da conta. Possui apenas o tipo e o saldo. O Id é setado automaticamente
const conta = {
  tipoDeConta: {
    type: String,
    enum: ['CORRENTE', 'POUPANÇA'],
    required: true,
    uppercase: true,
    trim: true
  },
  saldo: {
    type: Number,
    min: 0,
    required: true
  }
}

const ContaSchema = new Schema(conta)
const ContaModel = model<ContaI>('conta', ContaSchema)
export default ContaModel