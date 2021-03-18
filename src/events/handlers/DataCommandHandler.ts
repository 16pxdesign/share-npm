import {IDataCommand} from "../commands/IDataCommand";
import {DataEvent} from "../events/DataEvent";
import {ICommandHandler} from "./ICommandHandler";
import {IDataEvent} from "../events/DataEvent";

export class DataCommandHandler implements ICommandHandler<IDataCommand, IDataEvent>{
    async execute(command: IDataCommand): Promise<IDataEvent> {

        let event = new DataEvent();
        event.client = command.client;
        event.type = command.type;
        event.request_device_id = command.request_device_id;
        event.tag_id = command.tag_id;
        event.reader_type = command.reader_type;
        event.tag_rssi = command.tag_rssi;
        event.tag_txpower = command.tag_txpower;

        return  event;
    }

}