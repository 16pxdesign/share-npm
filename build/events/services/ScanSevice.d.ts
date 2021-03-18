import { EventBasedService } from "./IService";
import { IScanCommand } from "../commands/IScanCommand";
import { IScanEvent } from "../events/ScanEvent";
import { IState } from "../entities/IState";
export declare class ScanSevice extends EventBasedService<IScanCommand, IScanEvent, IState> {
    constructor();
    protected updateState(_: IState): Promise<void>;
    protected getCurrentState(_: IScanEvent): Promise<IState>;
}
