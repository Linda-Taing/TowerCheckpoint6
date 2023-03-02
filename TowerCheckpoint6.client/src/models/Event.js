export class Event {
    constructor(data) {
        this.id = data.id
        this.isCanceled = data.isCanceled
        this.name = data.name
        this.coverImg = data.coverImg
        this.location = data.location
        this.capacity = data.capacity
        this.startDate = data.startDate
        this.type = data.type
    }
}

