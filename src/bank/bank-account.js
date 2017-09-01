import AggregateRoot from '../es/event-sourcing/aggregate-root'
import * as Events from './event'

export default class BankAccount extends AggregateRoot {
  static open (id, name) {
    var bankAccount = new BankAccount()
    bankAccount.apply(new Events.OpenedEvent(id, name))
    return bankAccount
  }

  withdraw (amount) {
    if (this.closed) {
      throw new Error('Account is already closed.')
    }
    this.apply(new Events.WithdrawedEvent(this.id, amount))
  }

  deposit (amount) {
    if (this.closed) {
      throw new Error('Account is already closed.')
    }
    this.apply(new Events.DepositedEvent(this.id, amount))
  }

  close () {
    if (!this.closed) {
      this.apply(new Events.ClosedEvent(this.id))
    }
  }

  applyOpenedEvent (event) {
    this.id = event.id
    this.name = event.name
    this.balance = 0
    this.closed = false
  }

  applyWithdrawedEvent (event) {
    this.balance = this.balance || 0
    this.balance -= event.amount
  }

  applyDepositedEvent (event) {
    this.balance = this.balance || 0
    this.balance += event.amount
  }

  applyClosedEvent (event) {
    this.closed = true
  }
}
