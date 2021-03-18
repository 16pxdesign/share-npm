import {ICommand} from "./ICommand";

export interface IScanCommand extends ICommand {
    type: string;
    request_device_id: String;
    period?: number;
}