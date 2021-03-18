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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReaderListenerHandler = void 0;
const Wait_1 = require("./Wait");
const events_1 = __importDefault(require("events"));
/**
 * Helper singleton class to handle listener management for readers
 */
class ReaderListenerHandler extends events_1.default {
    constructor(arr) {
        super();
        this._arr = arr;
    }
    /** Singleton get instance */
    static getInstance(reset) {
        if (reset) {
            ReaderListenerHandler.instance = new ReaderListenerHandler(new Array());
        }
        if (!ReaderListenerHandler.instance) {
            ReaderListenerHandler.instance = new ReaderListenerHandler(new Array());
        }
        return ReaderListenerHandler.instance;
    }
    /** Perform some validation before adding Listener */
    validateAndAddListener(offset, handler, reader, client, type, timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            const thisRef = this;
            return new Promise(function (resolve, reject) {
                if (thisRef.isExist(reader, client)) {
                    //TODO: should decide is it create new or remove (for now just delete old)
                    thisRef.removeOldListener(reader, client, type);
                    console.log('WARN: Lister for reader and client working already -remove [Check TODO:]');
                }
                if (thisRef.isMaxSize(reader)) {
                    //FIXME: [Optional] Its probably hold all messages if only one reader is busy. NEED test as should block rest readers
                    console.log('WARN: Client overload - waiting to free listeners');
                    setTimeout(() => resolve(thisRef.validateAndAddListener(offset, handler, reader, client, type, timeout)), 1000);
                }
                else {
                    const listener = thisRef.saveNewListener(offset, handler, reader, client, type, timeout);
                    resolve(listener);
                }
            });
        });
    }
    /** add listener to the reader and register it in arr */
    saveNewListener(offset, handler, reader, client, type, timeout) {
        console.log('listener added');
        reader.addListener(type, handler);
        const listener = new Listener(offset, client, handler, type, reader, false);
        this._arr.push(listener);
        if (timeout)
            Wait_1.wait(timeout, () => {
                console.log('period timeout');
                this.removeOldListener(reader, client, type, offset);
            });
        return listener;
    }
    /** check is Lister exist for particular client and reader*/
    isExist(reader, client) {
        const filter = this._arr.filter(x => x.client == client);
        return filter.length > 0;
    }
    /** check listener max instances (default: 10 per reader) */
    isMaxSize(reader) {
        const MAX = 10;
        const filter = this._arr.filter(x => x.reader.path == reader.path);
        return filter.length >= MAX;
    }
    /** remove listener from reader and unregister it */
    removeOldListener(reader, client, type, offset) {
        let index = this._arr.findIndex(x => x.client === client && x.type === type && x.reader.path == reader.path);
        if (offset)
            index = this._arr.findIndex(x => x.client === client && x.type === type && x.reader.path == reader.path && x.offset == offset);
        if (index > -1) {
            let listener = this._arr[index];
            reader.removeListener(type, listener.callback);
            this._arr.splice(index, 1);
            this.emit('removed', reader, client, type);
        }
    }
    /** Remove all listeners */
    empty() {
        for (let i = (this._arr.length - 1); i > -1; i--) {
            let item = this._arr[i];
            this.removeOldListener(item.reader, item.client, item.type);
        }
    }
    /** return only one listener */
    getListener(reader, client, type) {
        const listeners = this._arr.filter(x => x.client === client && x.type === type && x.reader.path == reader.path);
        if (listeners.length > 1)
            throw Error('More then one');
        if (listeners.length > -1)
            return listeners[0];
        throw Error('Do not exist');
    }
    /** check is listener is active */
    isActive(reader, client, type) {
        return this.getListener(reader, client, type).active;
    }
    /** active or deactivate listener */
    activeListener(reader, client, type, val) {
        this.getListener(reader, client, type).active = val;
    }
    /** return list of listeners */
    getListeners() {
        return this._arr;
    }
}
exports.ReaderListenerHandler = ReaderListenerHandler;
/**
 * Inner helper class to store current state of readers listeners.
 * */
class Listener {
    constructor(offset, client, callback, type, reader, active) {
        this.offset = offset;
        this.client = client;
        this.callback = callback;
        this.type = type;
        this.reader = reader;
        this.active = !!active;
    }
}
