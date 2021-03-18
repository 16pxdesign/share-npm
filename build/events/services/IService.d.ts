import { IState } from "../entities/IState";
import { IEvent } from "../events/IEvent";
import { ICommand } from "../commands/ICommand";
import { ICommandHandler } from "../handlers/ICommandHandler";
import { IProjector } from "../projectors/IProjector";
import { IEventStore } from "../stores/IEventStore";
/**
 * Service interface that execute command
 */
export interface IService {
    execute(command: ICommand): Promise<IState>;
}
/**
 * Abstract class that define each step during event-driven architecture.
 * Class is a middleware of whole process from producing event to returning
 * changed data.
 */
export declare abstract class EventBasedService<Command extends ICommand, Event extends IEvent, State extends IState> implements IService {
    private commandHandler;
    private eventStores;
    private projector?;
    /** Update changes to db */
    protected abstract updateState(state: State): Promise<void>;
    /** Get current state from db */
    protected abstract getCurrentState(event: Event): Promise<State>;
    constructor(commandHandler: ICommandHandler<Command, Event>, eventStores: Array<IEventStore>, projector?: IProjector<Event, State> | undefined);
    /** Execute command and perform event actions */
    execute(command: Command): Promise<State>;
}
