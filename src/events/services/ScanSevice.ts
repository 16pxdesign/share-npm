import {EventBasedService} from "./IService";
import {IScanCommand} from "../commands/IScanCommand";
import {IScanEvent} from "../events/ScanEvent";
import {IState} from "../entities/IState";
import {ScanCommandHandler} from "../handlers/ScanCommandHandler";
import {ScanStore} from "../stores/ScanStore";

export class ScanSevice extends EventBasedService<IScanCommand,IScanEvent,IState> {


    constructor(){
        super(new ScanCommandHandler(), [new ScanStore()])
    }


    protected async  updateState(_: IState): Promise<void> {

    }

    protected async getCurrentState(_: IScanEvent): Promise<IState> {
        return { index: 0 }
    }



}

