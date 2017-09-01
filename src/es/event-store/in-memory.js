import DomainEvent from '../event-sourcing/domain-event'

export default class InMemoryEventStore {
  load(id) {
    this.events = this.events || []
    return this.events.filter(v => v.id == id)
  }

  append(id, eventStream) {
    var createdAt = new Date().getTime()
    var stream = eventStream.map(payload => new DomainEvent(id, payload, createdAt))
    this.events = this.events || []
    this.events = this.events.concat(stream)
  }

  fetch(criteria, callback) {
    this.events = this.events || []
    this.events.filter(criteria).forEach(event => callback.call(null, event))
  }
}
