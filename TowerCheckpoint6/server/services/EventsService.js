import { dbContext } from "../db/DbContext.js"


class EventsService {
    async getAllEvents(query) {
        const events = await dbContext.Events.find(query)
        return events
    }
    async createEvent(eventData) {
        const event = await dbContext.Events.create(eventData)
        return event

    }

}
export const eventsService = new EventsService()