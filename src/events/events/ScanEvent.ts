import mongoose, {Document, Model, Schema} from "mongoose";
import {IEvent} from "./IEvent";

export interface IScanEvent extends IEvent {
    type: string;
    request_device_id: String;
    period?: number;
}

const ScanSchema: Schema = new Schema({
    client: String,
    type: String,
    request_device_id: String,
    period: Number,

});

export const ScanEvent = mongoose.model<IScanEvent>('ScanEvent', ScanSchema, 'events');
