export default class DomainEvent {
  constructor (id, payload, createdAt) {
    this.id = id
    this.payload = payload
    this.createdAt = createdAt
  }
}
