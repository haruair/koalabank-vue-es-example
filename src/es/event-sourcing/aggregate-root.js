export default class AggregateRoot {
  apply (event) {
    this.version = this.version !== undefined ? this.version : -1
    this.version++
    this.handle(event)
    this.uncommittedEvents = this.uncommittedEvents || []
    this.uncommittedEvents.push(event)
  }

  getUncommittedEvents () {
    this.uncommittedEvents = this.uncommittedEvents || []
    var stream = this.uncommittedEvents
    delete this.uncommittedEvents
    return stream
  }

  getVersion () {
    return this.version !== undefined ? this.version : -1
  }

  handle (event) {
    var eventName = event.constructor.name
    eventName = 'apply' + eventName.charAt(0).toUpperCase() + eventName.slice(1)
    if (!this[eventName]) {
      return
    }

    this[eventName](event)
  }

  initializeState (eventStream) {
    this.version = this.version !== undefined ? this.version : -1
    eventStream.forEach(domainEvent => {
      this.version++
      this.handle(domainEvent.payload)
    })
  }
}
