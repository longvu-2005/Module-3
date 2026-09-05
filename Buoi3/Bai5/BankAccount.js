class BankAccount {
  #balance = 0;

  constructor(initialAmount) {
    this.#balance = initialAmount;
  }

  deposit(amount) {
    this.#balance += amount;
    console.log(`Đã nạp ${amount}. Số dư hiện tại: ${this.#balance}`);
  }
}

const myAcc = new BankAccount(100);
myAcc.deposit(50);