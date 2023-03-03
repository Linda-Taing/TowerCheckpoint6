import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { Comment } from "../models/Comment.js"
class CommentsService {
    async getEventComments(eventId) {
        logger.log(eventId)
        const res = await api.get(`api/events/${eventId}/comments`)
        logger.log('[Comments in the Service]', res.data)
        const comments = res.data.map(c => new Comment(c))
        AppState.comments = comments
    }

    async deleteEventCommentsById(commentId) {

        const res = await api.delete(`api/comments/${commentId}`)
        logger.log('[Comments By Id in the Service]', res.data)
        const comments = res.data.map(c => new Comment(c))

    }

}
export const commentsService = new CommentsService()