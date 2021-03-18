import mongoose from "mongoose";
import { IEvent } from "./IEvent";
export interface IScanEvent extends IEvent {
    type: string;
    request_device_id: String;
    period?: number;
}
export declare const ScanEvent: mongoose.Model<IScanEvent, {}>;
