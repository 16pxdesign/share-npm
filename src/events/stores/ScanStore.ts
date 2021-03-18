import {IEventStore} from "./IEventStore";
import {IEvent} from "../events/IEvent";
import {Document} from "mongoose";

export class ScanStore implements IEventStore{
    constructor() {
    }
    private store : any = {}
    async publish(event: IEvent): Promise<boolean> {

        /** Save event into database */
        const e = event as Document;
        const document = await e.save();
        console.log(document);

        /** Kafka: This approach is faster in implement however solves Promise response time
         * so good idea is not await on aknolage and believe is sent
         * Can be replaced by dispatcher that look in interval loop for events and push them do kafka log */
        //TODO: kafka?
        //throw new Error('kafka not Implemented ')



        return true
    }

}