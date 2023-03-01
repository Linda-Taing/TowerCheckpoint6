import { dbContext } from "../db/DbContext.js"
import { eventsService } from "../services/EventsService.js"
import { Forbidden } from "../utils/Errors.js"

class TicketsService {
    async createTicket(ticketData, requestorId) {
        const event = await eventsService.getEventById(ticketData.eventId)

        if (event.isCanceled == true) {
            throw new Forbidden('Tickets cannot be bought for events that do not exist!')
        }

        const ticket = await dbContext.Tickets.create(ticketData)

        await ticket.populate('profile')

        const foundEvent = await eventsService.getEventById(ticketData.eventId)
        foundEvent.capacity--


        await foundEvent.save()
        return ticket
    }

}
export const ticketsService = new TicketsService()