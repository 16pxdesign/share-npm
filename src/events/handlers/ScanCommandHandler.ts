import {IScanCommand} from "../commands/IScanCommand";
import {IScanEvent, ScanEvent} from "../events/ScanEvent";
import {ICommandHandler} from "./ICommandHandler";

export class ScanCommandHandler implements ICommandHandler<IScanCommand, IScanEvent>{
    async execute(command: IScanCommand): Promise<IScanEvent> {

        let event = new ScanEvent();
        event.client = command.client;
        event.type = command.type;
        event.request_device_id = command.request_device_id;
        event.period = command.period;

        return  event;
    }

}