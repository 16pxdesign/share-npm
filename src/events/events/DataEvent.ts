import mongoose, {Document, Model, Schema} from "mongoose";
import {IEvent} from "./IEvent";

export interface IDataEvent extends IEvent, Document {
    type: string;
    request_device_id: String;
    tag_id: string;
    tag_rssi?: string;
    reader_type: string;
    tag_txpower?: string;

}

const DataSchema: Schema = new Schema({
    client: String,
    type: String,
    request_device_id: String,
    tag_id: String,
    tag_rssi: String,
    reader_type: String,
    tag_txpower: String,


},

);



export const DataEvent = mongoose.model<IDataEvent>('DataEvent', DataSchema, 'events');
