import { Document } from "mongoose";
/**
 * Generic interface presents the description of the event
 * performed in action of the command execution
 */
export interface IEvent extends Document {
    client: string;
}
