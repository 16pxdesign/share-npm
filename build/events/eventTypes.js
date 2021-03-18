"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventTypes = void 0;
var eventTypes;
(function (eventTypes) {
    eventTypes["START_RD_SCAN"] = "Start scan reader";
    eventTypes["RD_SCAN_CONFIRM"] = "Reader confirm scanning";
    eventTypes["RD_SCAN_CONFIRM_STOP"] = "Reader stop scanning";
    eventTypes["READER_DATA"] = "Reader found data";
    eventTypes["STOP_RD_SCAN"] = "Stop scan reader";
})(eventTypes = exports.eventTypes || (exports.eventTypes = {}));
