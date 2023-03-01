import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"


class EventsService {
    async editEvent(eventId, eventData) {
        const foundEvent = await this.getEventById(eventId)
        foundEvent.name = eventData.name || foundEvent.name
        foundEvent.description = eventData.description || foundEvent.description
        foundEvent.coverImg = eventData.coverImg || foundEvent.coverImg
        foundEvent.location = eventData.location || foundEvent.location
        foundEvent.capacity = eventData.capacity || foundEvent.capacity
        foundEvent.startDate = eventData.startDate || foundEvent.startDate
        foundEvent.type = eventData.type || foundEvent.type
        foundEvent.isCancelled = eventData.isCancelled != null ? eventData.isCancelled : foundEvent.isCancelled
        await foundEvent.save()
        return foundEvent
    }
    async getEventById(eventId) {
        const event = await dbContext.Events.findById(eventId)
        if (!event) {
            throw new BadRequest('Invalid Event ID sorry!!')
        }
        return event
    }
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