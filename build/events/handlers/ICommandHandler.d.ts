import { ICommand } from "../commands/ICommand";
import { IEvent } from "../events/IEvent";
/**
 * Generic handler where command is translated to Event and back as callback
 */
export interface ICommandHandler<C extends ICommand, E extends IEvent> {
    execute(command: C): Promise<E>;
}
