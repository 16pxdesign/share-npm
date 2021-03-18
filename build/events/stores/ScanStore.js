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
exports.ScanStore = void 0;
class ScanStore {
    constructor() {
        this.store = {};
    }
    publish(event) {
        return __awaiter(this, void 0, void 0, function* () {
            /** Save event into database */
            const e = event;
            const document = yield e.save();
            console.log(document);
            /** Kafka: This approach is faster in implement however solves Promise response time
             * so good idea is not await on aknolage and believe is sent
             * Can be replaced by dispatcher that look in interval loop for events and push them do kafka log */
            //TODO: kafka?
            //throw new Error('kafka not Implemented ')
            return true;
        });
    }
}
exports.ScanStore = ScanStore;
