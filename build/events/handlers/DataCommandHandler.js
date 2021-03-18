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
exports.DataCommandHandler = void 0;
const DataEvent_1 = require("../events/DataEvent");
class DataCommandHandler {
    execute(command) {
        return __awaiter(this, void 0, void 0, function* () {
            let event = new DataEvent_1.DataEvent();
            event.client = command.client;
            event.type = command.type;
            event.request_device_id = command.request_device_id;
            event.tag_id = command.tag_id;
            event.reader_type = command.reader_type;
            event.tag_rssi = command.tag_rssi;
            event.tag_txpower = command.tag_txpower;
            return event;
        });
    }
}
exports.DataCommandHandler = DataCommandHandler;
