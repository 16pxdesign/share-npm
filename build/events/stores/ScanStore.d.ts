import { IEventStore } from "./IEventStore";
import { IEvent } from "../events/IEvent";
export declare class ScanStore implements IEventStore {
    constructor();
    private store;
    publish(event: IEvent): Promise<boolean>;
}
