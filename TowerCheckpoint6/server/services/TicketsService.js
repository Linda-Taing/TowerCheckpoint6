import { dbContext } from "../db/DbContext.js"
import { eventsService } from "../services/EventsService.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class TicketsService {
    async deleteTicket(ticketId, requestorId) {
        const ticket = await dbContext.Tickets.findById(ticketId)
        if (!ticket) {
            throw new BadRequest('Invalid ticket')
        }
        if (ticket.accountId.toString() !== requestorId) {
            throw new Forbidden('You can not delete a ticket that is not yours!')
        }
        await ticket.remove()
        const event = await eventsService.getEventById(ticket.eventId)
        event.capacity++
        await event.save()
        return 'No longer a ticket holder!'
    }
    async getEventTickets(eventId) {
        const tickets = await dbContext.Tickets.find({ eventId }).populate('profile')
        return tickets

    }
    async getMyTickets(accountId) {
        const tickets = await dbContext.Tickets.find({ accountId })
            .populate({
                path: 'event',
                populate: {
                    path: 'creator',
                }
            })

        return tickets
    }
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