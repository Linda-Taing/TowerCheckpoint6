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


}

export const attendeesService = new AttendeesService()