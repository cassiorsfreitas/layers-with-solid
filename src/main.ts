import express, { Request, Response } from 'express';
import CreateTransaction from './application/CreateTransaction';
import GetTransaction from './application/GetTransaction';
import TransactionDatabaseRepository from './infra/provider/TransactionDatabaseRepository';
import PostgreSQLAdapter from './infra/database/PostgreSQLAdapter';

const app = express();

app.use(express.json());
const connection = new PostgreSQLAdapter();

app.post("/transactions", async function (req: Request, res: Response) {
  const transactionRepository = new TransactionDatabaseRepository(connection);
  const createTransaction = new CreateTransaction(transactionRepository);
  await createTransaction.execute(req.body);
  res.end();
});

app.get("/transactions/:code", async function (req: Request, res: Response) {
  const transactionRepository = new TransactionDatabaseRepository(connection);

  const getTransaction = new GetTransaction(transactionRepository);
  const transaction = await getTransaction.execute(req.params.code);
  res.json(transaction);
})


app.listen(3000);
