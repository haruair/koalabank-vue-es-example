export default class EventSubscriber {
  handle (event) {
    var eventName = event.constructor.name
    eventName = 'apply' + eventName.charAt(0).toUpperCase() + eventName.slice(1)
    if (!this[eventName]) {
      return
    }

    this[eventName](event)
  }
}
