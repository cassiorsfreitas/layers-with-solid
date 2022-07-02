export interface ITransaction {
  execute(data: any): any;
}

export interface ITransactionDTO {
  code: string;
  amount: number;
  numberInstallments: number;
  paymentMethod: string;
}
