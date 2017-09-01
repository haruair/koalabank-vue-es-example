import EventSubscriber from '../../es/event-handling/event-subscriber'

export default class SimpleSubscriber extends EventSubscriber {
  constructor (callback) {
    super()
    this.callback = callback
  }
  handle (event) {
    this.callback(event)
  }
}
