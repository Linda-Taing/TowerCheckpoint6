import { Attendee } from "../models/Attendee.js"
import { api } from "./AxiosService.js"
import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { Ticket } from "../models/Ticket.js"


class AttendeesService {

    // TODO add method for getting tickets for event
    // make sure to send in the correct parameter (check postman)
    async getMyTickets() {
        const res = await api.get('account/tickets')
        logger.log('[Getting my tickets]', res.data)
        const tickets = res.data
        AppState.tickets = tickets
    }
    async createTicket() {
        const res = await api.post('api/tickets', eventId)
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