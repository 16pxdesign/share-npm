import { EventBasedService } from "./IService";
import { IState } from "../entities/IState";
import { ICommand } from "../commands/ICommand";
import { IEvent } from "../events/IEvent";
import { ICommandHandler } from "../handlers/ICommandHandler";
import { IEventStore } from "../stores/IEventStore";
import { IProjector } from "../projectors/IProjector";
export declare class KafkaScanService extends EventBasedService<ICommand, IEvent, IState> {
    constructor(commandHandler: ICommandHandler<ICommand, IEvent>, eventStores: Array<IEventStore>, projector?: IProjector<IEvent, IState>);
    protected updateState(_: IState): Promise<void>;
    protected getCurrentState(_: ICommand): Promise<IState>;
}
