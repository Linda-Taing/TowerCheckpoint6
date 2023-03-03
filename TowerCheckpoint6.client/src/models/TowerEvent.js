export class TowerEvent {
    constructor(data) {
        this.id = data.id
        this.comment = data.comment
        this.isCanceled = data.isCanceled
        this.name = data.name
        this.description = data.description
        this.coverImg = data.coverImg
        this.location = data.location
        this.capacity = data.capacity
        this.startDate =
            this.type = data.type
        this.createdAt = new Date(data.StartDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' });
    }
}

