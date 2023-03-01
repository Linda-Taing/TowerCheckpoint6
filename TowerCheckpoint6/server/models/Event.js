import { Schema } from "mongoose";

export const EventSchema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true, maxLength: 1000 },
        coverImg: { type: String, required: true, maxLength: 5000 },
        location: { type: String, required: true },
        capacity: { type: Number, required: true, min: 1, max: 1000, default: 200 },
        startDate: { type: String, required: true },
        type: { type: String, required: true },
        isCancelled: { type: Boolean, default: false, required: true },

        creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }


    },
    { timestamps: true, toJSON: { virtuals: true } }

)
