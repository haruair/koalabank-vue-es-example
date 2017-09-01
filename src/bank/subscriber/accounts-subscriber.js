import EventSubscriber from '../../es/event-handling/event-subscriber'

export default class AccountsSubscriber extends EventSubscriber {
  constructor (dataset) {
    super()
    this.dataset = dataset
  }
  applyOpenedEvent (event) {
    this.dataset.push({ id: event.id, name: event.name, balance: 0, closed: false })
  }
  applyWithdrawedEvent (event) {
    this.dataset.filter(v => v.id === event.id).forEach(v => {
      v.balance -= event.amount
    })
  }
  applyDepositedEvent (event) {
    this.dataset.filter(v => v.id === event.id).forEach(v => {
      v.balance += event.amount
    })
  }
  applyClosedEvent (event) {
    this.dataset.filter(v => v.id === event.id).forEach(v => {
      v.closed = true
    })
  }
}
