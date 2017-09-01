export default class EventBus {
  eventHandlers = []

  subscribe (eventHandler) {
    this.eventHandlers.push(eventHandler)
  }

  publish (eventStream) {
    this.queue = this.queue || []

    eventStream.forEach(event => {
      this.queue.push(event)
    })

    if (this.isPublishing) return
    this.isPublishing = true

    while (this.queue.length > 0) {
      var queue = this.queue.shift()
      this.eventHandlers.forEach(handler => {
        handler.handle(queue)
      })
    }

    this.isPublishing = false
  }
}
