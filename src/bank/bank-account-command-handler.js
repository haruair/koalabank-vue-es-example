import CommandHandler from '../es/command-handling/command-handler'
import BankAccount from './bank-account'

export default class BankAccountCommandHandler extends CommandHandler {
  constructor (repository) {
    super()
    this.repository = repository
  }

  handleOpenCommand (command) {
    var account = BankAccount.open(command.id, command.name)
    this.repository.save(account)
  }

  handleCloseCommand (command) {
    var account = this.repository.load(command.id)
    try {
      account.close()
    } catch (e) {
      alert(e)
      return
    }
    this.repository.save(account)
  }

  handleWithdrawCommand (command) {
    var account = this.repository.load(command.id)
    try {
      account.withdraw(command.amount)
    } catch (e) {
      alert(e)
      return
    }
    this.repository.save(account)
  }

  handleDepositCommand (command) {
    var account = this.repository.load(command.id)
    try {
      account.deposit(command.amount)
    } catch (e) {
      alert(e)
      return
    }
    this.repository.save(account)
  }
}
