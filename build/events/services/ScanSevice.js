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
exports.ScanSevice = void 0;
const IService_1 = require("./IService");
const ScanCommandHandler_1 = require("../handlers/ScanCommandHandler");
const ScanStore_1 = require("../stores/ScanStore");
class ScanSevice extends IService_1.EventBasedService {
    constructor() {
        super(new ScanCommandHandler_1.ScanCommandHandler(), [new ScanStore_1.ScanStore()]);
    }
    updateState(_) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    getCurrentState(_) {
        return __awaiter(this, void 0, void 0, function* () {
            return { index: 0 };
        });
    }
}
exports.ScanSevice = ScanSevice;
