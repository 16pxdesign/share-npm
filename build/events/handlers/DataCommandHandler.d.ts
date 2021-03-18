import { IDataCommand } from "../commands/IDataCommand";
import { ICommandHandler } from "./ICommandHandler";
import { IDataEvent } from "../events/DataEvent";
export declare class DataCommandHandler implements ICommandHandler<IDataCommand, IDataEvent> {
    execute(command: IDataCommand): Promise<IDataEvent>;
}
