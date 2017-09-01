export default class CommandHandler {
  handle (command) {
    var commandName = command.constructor.name
    commandName = 'handle' + commandName.charAt(0).toUpperCase() + commandName.slice(1)
    if (!this[commandName]) {
      return
    }

    this[commandName](command)
  }
}
