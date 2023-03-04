import { Schema } from "mongoose";

export const CommentSchema = new Schema({
    body: { type: String, required: true, maxLength: 1000 },
    isAttending: { type: Boolean, default: false },
    eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },


},
    { timestamps: true, toJSON: { virtuals: true } }
)
CommentSchema.virtual('creator', {
    ref: 'Account',
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true
})