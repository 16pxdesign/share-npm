import { IEventStore } from "./IEventStore";
import { IEvent } from "../events/IEvent";
import { Kafka } from "kafkajs";
export declare class KafkaStore implements IEventStore {
    kafka: Kafka;
    topic: string;
    constructor(kafka: Kafka, topic?: string);
    publish(event: IEvent): Promise<boolean>;
}
