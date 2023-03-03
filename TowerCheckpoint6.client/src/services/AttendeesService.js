import { Attendee } from "../models/Attendee.js"
import { api } from "./AxiosService.js"
import { AppState } from "../AppState.js"

class AttendeesService {
    async getMyTickets() {
        const res = await api.get('account/tickets')
        const tickets = res.data.map(t => new Attendee(t))
        AppState.tickets = tickets
    }
    async createTicket() {
        const res = await api.post('api/tickets', eventId)
        logger.log('creating ticket', res.data)
    }

    async deleteTicket(attendeeId) {
        const res = await api.delete(`api/tickets/${attendeeId}`)
        debugger
        logger.log('[DELETING TICKET]', res.data)
        const ticketIndex = AppState.attendees.findIndex(t => t.attendeeId == attendeeId)
        if (attendee !== -1) {
            AppState.attendees.splice(ticketIndex, 1)
        }
    }


}

export const attendeesService = new AttendeesService()