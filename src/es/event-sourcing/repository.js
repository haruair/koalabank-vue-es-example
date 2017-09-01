export default class Repository {
  constructor (eventStore, eventBus, aggregateClass) {
    this.eventStore = eventStore
    this.eventBus = eventBus
    this.aggregateClass = aggregateClass
  }

  load (id) {
    var events = this.eventStore.load(id)

    var aggregate = Object.create(this.aggregateClass.prototype)
    aggregate.initializeState(events)
    return aggregate
  }

  save (aggregate) {
    var eventStream = aggregate.getUncommittedEvents()
    this.eventStore.append(aggregate.id, eventStream)
    this.eventBus.publish(eventStream)
  }
}
