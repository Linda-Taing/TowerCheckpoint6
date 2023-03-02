import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { eventsService } from "../services/EventsService.js";
import { ticketsService } from "../services/TicketsService.js";

export class EventsController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getAllEvents)
            .get('/:eventId', this.getEventById)
            .get('/:eventId/tickets', this.getEventTickets)
            .get('/:eventId/comments', this.getEventComments)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createEvent)
            .put('/:eventId', this.editEvent)
            .delete('/:eventId', this.cancelEvent)





    }
    async getEventComments(req, res, next) {
        try {
            const eventId = req.params.eventId
            const comments = await eventsService.getEventComments(eventId)
            return res.send(comments)
        } catch (error) {
            next(error)
        }
    }
    async getEventTickets(req, res, next) {
        try {
            const eventId = req.params.eventId
            const tickets = await ticketsService.getEventTickets(eventId)
            return res.send(tickets)
        } catch (error) {
            next(error)

        }
    }
    async cancelEvent(req, res, next) {
        try {
            const eventId = req.params.eventId
            const requestorId = req.userInfo.id
            const event = await eventsService.cancelEvent(eventId, requestorId)
            return res.send(event)
        } catch (error) {
            next(error)
        }
    }
    async editEvent(req, res, next) {
        try {
            const eventId = req.params.eventId
            const requestorId = req.userInfo.id
            const eventData = req.body
            const editedEvent = await eventsService.editEvent(eventId, eventData, requestorId)
            return res.send(editedEvent)
        } catch (error) {
            next(error)
        }
    }
    async getEventById(req, res, next) {
        try {
            const eventId = req.params.eventId
            const event = await eventsService.getEventById(eventId)
            return res.send(event)
        } catch (error) {
            next(error)
        }
    }
    async getAllEvents(req, res, next) {
        try {
            const query = req.query
            const events = await eventsService.getAllEvents(query)
            return res.send(events)
        } catch (error) {
            next(error)
        }
    }
    async createEvent(req, res, next) {
        try {
            const eventData = req.body
            // Null check purposes VVVV
            eventData.creatorId = req.userInfo.id
            const event = await eventsService.createEvent(eventData)
            return res.send(event)
        } catch (error) {
            next(error)
        }
    }


}