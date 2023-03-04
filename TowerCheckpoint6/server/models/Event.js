import { Schema } from "mongoose";

export const EventSchema = new Schema(
    {

        // FIXME don't allow a super long name
        name: { type: String, required: true, maxLength: 15 },
        description: { type: String, required: true, maxLength: 1000 },
        coverImg: { type: String, required: true, maxLength: 5000 },
        location: { type: String, required: true },
        // FIXME don't allow a negative capactity
        capacity: { type: Number, required: true, default: 100, min: 0, max: 300 },
        startDate: { type: Date, required: true, },
        // FIXME don't allow anything to be put in here, must be one of a specific value
        type: { type: String, enum: ['concert', 'digital', 'conventions', 'sports'], required: true },
        isCanceled: { type: Boolean, required: true, default: false },

        creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }


    },
    { timestamps: true, toJSON: { virtuals: true } }

)

EventSchema.virtual('creator', {
    ref: 'Account',
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true
})
