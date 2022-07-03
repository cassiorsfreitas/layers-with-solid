import pgp from 'pg-promise';
import TransactionRepository from '../domain/repository/TransactionRepository';
export default class CreateTransaction {

  constructor (readonly transactionRepository: TransactionRepository) {
	}

  async execute(input: InputNewTransaction): Promise<void> {
  const connection = pgp()("postgres://cassiofreitas:123456@localhost:5432/postgres");
  await connection.query("insert into cf.transaction (code, amount, number_installments, payment_method) values ($1, $2, $3, $4)", [input.code, input.amount, input.numberInstallments, input.paymentMethod]);
  let number = 1;
  let amount = Math.round((input.amount / input.numberInstallments)*100)/100;
  let diff = Math.round((input.amount - amount*input.numberInstallments)*100)/100;
  while (number <= input.numberInstallments) {
    if (number == input.numberInstallments) {
       amount += diff;
    }
    await connection.query("insert into cf.installment (code, number, amount) values ($1, $2, $3)", [input.code, number, amount]);
    number++
  }
  await connection.$pool.end();
  }
}

type InputNewTransaction = {
  code: string;
  amount: number;
  numberInstallments: number;
  paymentMethod: string;
}
