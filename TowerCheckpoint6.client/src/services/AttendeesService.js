import { Attendee } from "../models/Attendee.js"
import { api } from "./AxiosService.js"
import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { Ticket } from "../models/Ticket.js"


class AttendeesService {

    // TODO add method for getting tickets for event
    // make sure to send in the correct parameter (check postman)
    // FIXME 3-4 9:54 am[[added method in from Event Details Page. This looks like the get comments method and I referenced but it is returning Undefined. this is to draw the attendees onto the EventsDetails page.]]
    async getEventTickets(eventId) {
        const res = await api.get(`api/events/${eventId}/tickets`)
        logger.log('[GETTING ALL THE ATTENDEES?', res.data)
        const tickets = res.data.map(t => new Ticket(t))
        AppState.tickets = tickets
    }
    async getMyTickets() {
        const res = await api.get('account/tickets')
        logger.log('[Getting my tickets]', res.data)
        const tickets = res.data
        AppState.tickets = tickets
    }
    async createTicket(ticketData) {
        const res = await api.post('api/tickets', ticketData)
        logger.log('creating ticket', res.data)
    }

    async deleteTicket(ticketId) {
        const res = await api.delete(`api/tickets/${ticketId}`)
        logger.log('[DELETING TICKET]', res.data)
        const ticketIndex = AppState.tickets.findIndex(t => t.id == ticketId)
        if (ticketId !== -1) {
            AppState.tickets.splice(ticketIndex, 1)
        }
    }


}

export const attendeesService = new AttendeesService()