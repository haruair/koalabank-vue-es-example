import DomainEvent from '../event-sourcing/domain-event'

export default class LocalStorageEventStore {
  constructor (eventTypes) {
    this.eventTypes = eventTypes
  }
  getStorage () {
    var raw = window.localStorage.getItem('event-store')
    var data = JSON.parse(raw) || []

    data = data.map(v => {
      var payload = v.domainEvent.payload
      var props = this.convertPayloadToProps(payload)
      var event = Object.create(this.eventTypes[v['@type']].prototype, props)
      var createdAt = v['@createdAt']
      return new DomainEvent(payload.id, event, createdAt)
    })

    return data
  }

  convertPayloadToProps (payload) {
    var props = {}
    Object.keys(payload).forEach(key => {
      props[key] = {
        value: payload[key],
        enumerable: true
      }
    })
    return props
  }

  setStorage (stream) {
    var data = stream.map(domainEvent => {
      return {
        '@type': domainEvent.payload.constructor.name,
        '@createdAt': domainEvent.createdAt,
        domainEvent: domainEvent
      }
    })
    window.localStorage.setItem('event-store', JSON.stringify(data))
  }

  load (id) {
    var data = this.getStorage()
    return data.filter(v => v.id === id)
  }

  append (id, eventStream) {
    var createdAt = new Date().getTime()
    var stream = eventStream.map(payload => new DomainEvent(id, payload, createdAt))
    var data = this.getStorage()
    this.setStorage(data.concat(stream))
  }

  fetch (criteria, callback) {
    this.getStorage().filter(criteria).forEach(event => callback(event))
  }
}
