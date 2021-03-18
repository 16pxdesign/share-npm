import {IState} from "../entities/IState";
import {IEvent} from "../events/IEvent";
import {ICommand} from "../commands/ICommand";
import {ICommandHandler} from "../handlers/ICommandHandler";
import {IProjector} from "../projectors/IProjector";
import {IEventStore} from "../stores/IEventStore";

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
export abstract class EventBasedService<Command extends ICommand,
    Event extends IEvent,
    State extends IState> implements IService {

    /** Update changes to db */
    protected abstract updateState(state: State): Promise<void>;

    /** Get current state from db */
    protected abstract getCurrentState(event: Event): Promise<State>;

    constructor(
        private commandHandler: ICommandHandler<Command, Event>,
        private eventStores: Array<IEventStore>,
        private projector?: IProjector<Event, State>,
    ) {
    }

    /** Execute command and perform event actions */
    async execute(command: Command): Promise<State> {
        const event = await this.commandHandler.execute(command);
        for (let eventStore of this.eventStores){

            await eventStore.publish(event);
        }

        let state = await this.getCurrentState(event);

        if(this.projector){
            state = await this.projector.project(state, event);
            await this.updateState(state);
        }

        return state;
    }


}