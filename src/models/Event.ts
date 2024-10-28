import mongoose, { Document, Schema } from "mongoose";

export interface IEvent extends Document {
    _id: any;
    name: string;
    description: string;
    startDateTime: Date;
    endDateTime: Date;
    capacity: number;
    attendees: string[];
    }

    const eventSchema = new Schema<IEvent>({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    startDateTime: {
        type: Date,
        required: true,
    },
    endDateTime: {
        type: Date,
        required: true,
    },
    capacity: {
        type: Number,
        required: true,
    },
    attendees: {
        type: [String],
        required: true,
    }
    });


const Event = mongoose.model("Event", eventSchema);

export default Event;