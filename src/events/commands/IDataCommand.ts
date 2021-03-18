import {ICommand} from "./ICommand";

export interface IDataCommand extends ICommand {
    type: string;
    request_device_id: String;
    tag_id: string;
    tag_rssi?: string;
    reader_type: string;
    tag_txpower?: string;

}