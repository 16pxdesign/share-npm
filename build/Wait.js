"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wait = void 0;
/** async helper function to delay @fn by timeout*/
const wait = (timeout, fn) => {
    return new Promise((resolve => {
        setTimeout(() => {
            resolve(fn());
        }, timeout);
    }));
};
exports.wait = wait;
