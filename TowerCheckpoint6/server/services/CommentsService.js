import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class CommentsService {
    async deleteComment(commentId, requestorId) {
        const comment = await dbContext.Comments.findById(commentId)
        if (!comment) {
            throw new BadRequest('No comment exists!')
        }
        if (comment.creatorId != requestorId) {
            throw new Forbidden('You cannot delete comments that do not belong to you!')
        }
        comment.remove()
        return 'Your comment has been deleted!'
    }
    async createComment(commentData) {
        const comment = await dbContext.Comments.create(commentData)
        await comment.populate('creator')
        return comment
    }

}
export const commentsService = new CommentsService()