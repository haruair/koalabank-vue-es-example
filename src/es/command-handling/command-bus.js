export default class CommandBus {
  commandHandlers = []
  isDispatching = false

  subscribe (commandHandler) {
    this.commandHandlers.push(commandHandler)
  }

  dispatch (command) {
    if (this.isDispatching) {
      return
    }

    this.isDispatching = true
    this.commandHandlers.forEach(commandHandler => {
      commandHandler.handle(command)
    })
    this.isDispatching = false
  }
}
