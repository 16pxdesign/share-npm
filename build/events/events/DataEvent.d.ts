import mongoose, { Document } from "mongoose";
import { IEvent } from "./IEvent";
export interface IDataEvent extends IEvent, Document {
    type: string;
    request_device_id: String;
    tag_id: string;
    tag_rssi?: string;
    reader_type: string;
    tag_txpower?: string;
}
export declare const DataEvent: mongoose.Model<IDataEvent, {}>;
