import { IScanCommand } from "../commands/IScanCommand";
import { IScanEvent } from "../events/ScanEvent";
import { ICommandHandler } from "./ICommandHandler";
export declare class ScanCommandHandler implements ICommandHandler<IScanCommand, IScanEvent> {
    execute(command: IScanCommand): Promise<IScanEvent>;
}
