"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventBasedService = void 0;
/**
 * Abstract class that define each step during event-driven architecture.
 * Class is a middleware of whole process from producing event to returning
 * changed data.
 */
class EventBasedService {
    constructor(commandHandler, eventStores, projector) {
        this.commandHandler = commandHandler;
        this.eventStores = eventStores;
        this.projector = projector;
    }
    /** Execute command and perform event actions */
    execute(command) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = yield this.commandHandler.execute(command);
            for (let eventStore of this.eventStores) {
                yield eventStore.publish(event);
            }
            let state = yield this.getCurrentState(event);
            if (this.projector) {
                state = yield this.projector.project(state, event);
                yield this.updateState(state);
            }
            return state;
        });
    }
}
exports.EventBasedService = EventBasedService;
