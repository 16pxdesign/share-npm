import { IEvent } from "../events/IEvent";
import { IState } from "../entities/IState";
/**
 * Generic interface to execute any changes that event need to make
 * and return new version (state)
 */
export interface IProjector<Event extends IEvent, State extends IState> {
    project(currentState: State, event: Event): Promise<State>;
}
