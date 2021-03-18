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
exports.ScanCommandHandler = void 0;
const ScanEvent_1 = require("../events/ScanEvent");
class ScanCommandHandler {
    execute(command) {
        return __awaiter(this, void 0, void 0, function* () {
            let event = new ScanEvent_1.ScanEvent();
            event.client = command.client;
            event.type = command.type;
            event.request_device_id = command.request_device_id;
            event.period = command.period;
            return event;
        });
    }
}
exports.ScanCommandHandler = ScanCommandHandler;
