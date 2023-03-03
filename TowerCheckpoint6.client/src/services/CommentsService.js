import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class CommentsService {
    // async getEventComments(eventId) {
    //     const res = await api.get(`api/events/${eventId}/comments`)
    //     logger.log('[Comments in the Service]', res.data)
    //     const comments = res.data.map(c => new Comment(c))
    //     AppState.comments = comments
    // }

    // async getEventCommentsById(commentId) {

    //     const res = await api.get(`api/comments/${commentId}`)
    //     logger.log('[Comments By Id in the Service]', res.data)
    //     const comments = res.data.map(c => new Comment(c))
    //     AppState.comments = currentComment
    // }

}
export const commentsService = new CommentsService()