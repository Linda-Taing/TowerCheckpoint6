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
    async createComment(formData) {
        const res = await api.post('api/comments', formData)
        logger.log('[CREATING COMMENT]', res.data)
        // TODO add the comment into the array...look at push method
        // NOTE you will not need '=' here
        AppState.comments.push(new Comment(res.data))
    }
    async deleteEventCommentsById(commentId) {

        const res = await api.delete(`api/comments/${commentId}`)
        logger.log('[Comments By Id in the Service]', res.data)
        const commentIndex = AppState.comments.findIndex(c => c.commentId == commentId)
        if (commentId !== -1) {
            AppState.comments.splice(commentIndex, 1)
        }

    }

}
export const commentsService = new CommentsService()