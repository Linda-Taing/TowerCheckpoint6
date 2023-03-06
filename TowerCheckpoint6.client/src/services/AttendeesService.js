import { api } from "./AxiosService.js"
import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { Ticket } from "../models/Ticket.js"


class AttendeesService {

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
        AppState.tickets.push(new Ticket(res.data))
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