import pgp from 'pg-promise';
import TransactionRepository from '../domain/repository/TransactionRepository';
export default class GetTransaction {

  constructor (readonly transactionRepository: TransactionRepository) {
	}

  async execute(code: string): Promise<Output> {
    const connection = pgp()("postgres://cassiofreitas:123456@localhost:5432/postgres");
    const transaction = await connection.one("select * from cf.transaction where code = $1", [code]);
    transaction.amount = parseFloat(transaction.amount);
    transaction.paymentMethod = transaction.payment_method;
    const installments = await connection.query("select * from cf.installment where code = $1", [code]);
    for (const installment of installments) {
      installment.amount = parseFloat(installment.amount);
    }
    transaction.installments = installments;
    await connection.$pool.end();
    return transaction;
  }
}

type Output = {
	code: string,
	amount: number,
	numberInstallments: number,
	paymentMethod: string,
	installments: { number: number, amount: number }[]
}
