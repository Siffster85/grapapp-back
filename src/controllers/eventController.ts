import Event from "../models/Event";
import { Request, Response } from "express";
import { BadRequestError } from "../middleware/errorMiddleware";
import asyncHandler from "express-async-handler";

const getEvents = asyncHandler(async (req: Request, res: Response ) =>{
    const events = await Event.find({}, "name description startDateTime endDateTime capacity attendees");

    res.status(200).json(
        events.map((event) => {
            return { id: event._id, name: event.name, description: event.description, startDateTime: event.startDateTime, endDateTime: event.endDateTime, capacity: event.capacity, attendees: event.attendees};
        })
    )
})

const getEvent = asyncHandler(async (req: Request, res: Response) => {
    const eventId = req.params.eventId
    const event = await Event.findById(eventId, "name description startDateTime endDateTime capacity attendees");

    if (!event) {
        throw new BadRequestError("Event not available");
    }
    res.status(200).json(event);
});

const createEvent = asyncHandler(async (req: Request, res: Response) => {
    const { name, description, startDateTime, endDateTime, capacity, attendees } = req.body;


    const event = await Event.create({
        name,
        description,
        startDateTime, 
        endDateTime,
        capacity,
        attendees,
    })

    if (event) {
        res.status(201).json({
            id: event._id,
            name: event.name,
            description: event.description,
            startDateTime: event.startDateTime, 
            endDateTime: event.endDateTime,
            capacity: event.capacity,
            attendees: event.attendees,
        })
    } else {
        throw new BadRequestError("An error occurred creating this event");
}
})

const deleteEvent = asyncHandler(async (req: Request, res: Response) => {    
    const eventId = req.params.eventId
    const event = await Event.findByIdAndDelete(eventId);

    if(!event) {
        throw new BadRequestError("Event not available");
    }
    res.status(200).json(event);
})

const updateEvent = asyncHandler(async (req: Request, res: Response) => { 
    const eventId = req.params.eventId
    const payload = req.body
    const event = await Event.findById(eventId);
    if (!event) {
        throw new BadRequestError("Event not available");
    }
    const updatedEvent = await Event.findByIdAndUpdate(
        eventId,
        payload,
        { new: true }
    );
    if (!updatedEvent) {
        throw new Error('Event not found');
    }

    res.status(200).json(updatedEvent);
})


const attendEvent = asyncHandler(async (req: Request, res: Response) => {
    const eventId = req.params.eventId
    const payload = req.body.payload
    let userId = ""
    if (req.body.payload.$push){
        userId = req.body.payload.$push.attendees
    }
    
    const event = await Event.findById(eventId);
    if (event?.attendees?.includes(userId)) {
        throw new Error("Already Attending")
    }
    const updatedEvent = await Event.findByIdAndUpdate(
        eventId,
        payload,
        { new: true }
    );
    if (!updatedEvent) {
        throw new Error('Event not found');
    }

    res.status(200).json(updatedEvent);
});



export { createEvent, getEvents, getEvent, deleteEvent, updateEvent, attendEvent }

