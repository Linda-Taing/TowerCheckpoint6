import { api } from "./AxiosService.js"
import { logger } from "../utils/Logger.js"
import { AppState } from "../AppState.js"


class EventsService {
    async getAllEvents() {
        const res = await api.get('api/events')
        logger.log('[GETTING EVENTS]', res.data)
        const events = res.data.map(e => new Event(e))
        AppState.events = events

    }
}
export const eventsService = new EventsService()