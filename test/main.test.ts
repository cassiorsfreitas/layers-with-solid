import axios from "axios"

// given, when, then - arrange, act, assert -> TDD

describe('Use case: Transaction', () => {
  test('Should create a new transaction', async () => {
    const code = Math.floor(Math.random() * 1000);
    await axios({
      url: 'http://localhost:3000/transactions',
      method: 'post',
      data: {
        code,
        amount: 1000,
        numberInstallments: 12,
        paymentMethod: "credit_card",
      }
    })
  })
})
