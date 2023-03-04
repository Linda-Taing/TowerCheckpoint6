import { api } from "./AxiosService.js"
import { logger } from "../utils/Logger.js"
import { AppState } from "../AppState.js"
import { TowerEvent } from "../models/TowerEvent.js"


class EventsService {
    setCurrentEvent(eventData) {
        AppState.currentEvent = eventData
    }

    async getAllEvents() {
        const res = await api.get('api/events')
        console.log(res.data)
        logger.log('[GETTING EVENTS]', res.data)
        const events = res.data.map(e => new TowerEvent(e))
        AppState.events = events
        console.log(AppState.events);

    }
    async getEventById(eventId) {
        const res = await api.get('api/events/' + eventId)
        logger.log('[Events by ID in the service]', res.data)
        const currentEvent = res.data.map(e => new TowerEvent(e))
        AppState.events = currentEvent
    }

    async createEvent(formData) {
        const res = await api.post('api/events', formData)
        logger.log('[CREATING EVENT]', res.data)
        AppState.currentEvent = new TowerEvent(res.data)
        return res.data
    }

    async cancelEvent(eventId) {
        const res = await api.delete(`api/events/${eventId}`)

        logger.log('[CANCELLING EVENT]', res.data)
        const eventIndex = AppState.events.findIndex(e => e.id == eventId)
        if (eventId !== -1) {
            AppState.events.splice(eventIndex, 1)
        }

    }

}
export const eventsService = new EventsService()