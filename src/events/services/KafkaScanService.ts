import {EventBasedService} from "./IService";
import {IState} from "../entities/IState";
import {ICommand} from "../commands/ICommand";
import {IEvent} from "../events/IEvent";
import {ICommandHandler} from "../handlers/ICommandHandler";
import {IEventStore} from "../stores/IEventStore";
import {IProjector} from "../projectors/IProjector";

export class KafkaScanService extends EventBasedService<ICommand,IEvent,IState> {


    constructor(commandHandler: ICommandHandler<ICommand, IEvent>, eventStores: Array<IEventStore>, projector?: IProjector<IEvent, IState>) {
        super(commandHandler, eventStores, projector);
    }

    protected async  updateState(_: IState): Promise<void> {}

    protected async getCurrentState(_: ICommand): Promise<IState> {
        return { index: 0 }
    }



}