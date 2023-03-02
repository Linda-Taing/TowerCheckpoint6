import { api } from "./AxiosService.js"
import { logger } from "../utils/Logger.js"
import { AppState } from "../AppState.js"
import { TowerEvent } from "../models/TowerEvent.js"


class EventsService {
    async getAllEvents() {
        const res = await api.get('api/events')
        console.log(res.data)
        logger.log('[GETTING EVENTS]', res.data)
        const events = res.data.map(e => new TowerEvent(e))
        AppState.events = events
        console.log(AppState.events);

    }

    async createEvent(formData) {
        const res = await api.post('api/events', formData)
        logger.log('[CREATING EVENT]', res.data)
        AppState.events = new TowerEvent(res.data)
        return res.data

    }


}
export const eventsService = new EventsService()