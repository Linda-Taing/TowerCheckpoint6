import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"


class EventsService {

    async getEventComments(eventId) {
        const comments = await dbContext.Comments.find({ eventId })
            .populate('creator', 'name picture')
        return comments
    }
    async cancelEvent(eventId, requestorId) {
        const event = await this.getEventById(eventId)

        if (event.creatorId != requestorId) {
            throw new Forbidden('You are not authorized to perform this action... It is not your event to cancel')
        }
        event.isCanceled = true
        await event.save()
        return event
    }
    async editEvent(eventId, eventData, requestorId) {
        const foundEvent = await this.getEventById(eventId)
        if (foundEvent.creatorId != requestorId) {
            throw new Forbidden('You cannot do this')
        }
        if (foundEvent.isCanceled == true) {
            throw new Forbidden('There is no Event to edit!!')
        }
        foundEvent.name = eventData.name || foundEvent.name
        foundEvent.description = eventData.description || foundEvent.description
        foundEvent.coverImg = eventData.coverImg || foundEvent.coverImg
        foundEvent.location = eventData.location || foundEvent.location
        foundEvent.capacity = eventData.capacity || foundEvent.capacity
        foundEvent.startDate = eventData.startDate || foundEvent.startDate
        foundEvent.type = eventData.type || foundEvent.type
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