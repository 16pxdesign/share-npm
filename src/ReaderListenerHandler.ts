import {wait} from "./Wait";
import EventEmitter from "events";

/**
 * Helper singleton class to handle listener management for readers
 */
export class ReaderListenerHandler extends EventEmitter {

    private static instance: ReaderListenerHandler; //Singleton instance
    private _arr: Array<Listener>; //Store listeners assigned to devices

    private constructor(arr: Array<Listener>) {
        super()
        this._arr = arr;
    }

    /** Singleton get instance */
    public static getInstance(reset?: boolean): ReaderListenerHandler {
        if (reset) {
            ReaderListenerHandler.instance = new ReaderListenerHandler(new Array<Listener>());
        }
        if (!ReaderListenerHandler.instance) {
            ReaderListenerHandler.instance = new ReaderListenerHandler(new Array<Listener>());
        }
        return ReaderListenerHandler.instance;
    }

    /** Perform some validation before adding Listener */
    public async validateAndAddListener(offset: string, handler: Function, reader: any, client: string, type: string, timeout?: number): Promise<Listener> {
        const thisRef = this;
        return new Promise(function (resolve, reject) {
            if (thisRef.isExist(reader, client)) {
                //TODO: should decide is it create new or remove (for now just delete old)
                thisRef.removeOldListener(reader, client, type)
                console.log('WARN: Lister for reader and client working already -remove [Check TODO:]')
            }
            if (thisRef.isMaxSize(reader)) {
                //FIXME: [Optional] Its probably hold all messages if only one reader is busy. NEED test as should block rest readers
                console.log('WARN: Client overload - waiting to free listeners')
                setTimeout(() => resolve(thisRef.validateAndAddListener(offset, handler, reader, client, type, timeout)), 1000);
            } else {
                const listener = thisRef.saveNewListener(offset, handler, reader, client, type, timeout);
                resolve(listener)
            }

        });
    }

    /** add listener to the reader and register it in arr */
    public saveNewListener(offset: string, handler: Function, reader: any, client: string, type: string, timeout?: number) {
        console.log('listener added')
        reader.addListener(type, handler)
        const listener = new Listener(offset, client, handler, type, reader, false);
        this._arr.push(listener)

        if (timeout)
            wait(timeout, () => {
                console.log('period timeout')
                this.removeOldListener(reader, client, type, offset)
            });
        return listener
    }

    /** check is Lister exist for particular client and reader*/
    public isExist(reader: any, client: string,): boolean {
        const filter: Array<Listener> = this._arr.filter(x => x.client == client);
        return filter.length > 0
    }

    /** check listener max instances (default: 10 per reader) */
    public isMaxSize(reader: any): boolean {
        const MAX = 10;
        const filter: Array<Listener> = this._arr.filter(x => x.reader.path == reader.path);
        return filter.length >= MAX;
    }

    /** remove listener from reader and unregister it */
    public removeOldListener(reader: any, client: string, type: string, offset?: string) {
        let index = this._arr.findIndex(x => x.client === client && x.type === type && x.reader.path == reader.path);
        if (offset)
            index = this._arr.findIndex(x => x.client === client && x.type === type && x.reader.path == reader.path && x.offset == offset);
        if (index > -1) {
            let listener: Listener = this._arr[index];
            reader.removeListener(type, listener.callback);
            this._arr.splice(index, 1);
            this.emit('removed', reader, client, type)
        }
    }

    /** Remove all listeners */
    public empty(): void {
        for (let i = (this._arr.length - 1); i > -1; i--) {
            let item = this._arr[i];
            this.removeOldListener(item.reader, item.client, item.type);
        }
    }

    /** return only one listener */
    public getListener(reader: any, client: string, type: string): Listener {
        const listeners = this._arr.filter(x => x.client === client && x.type === type && x.reader.path == reader.path)
        if (listeners.length > 1)
            throw Error('More then one')
        if (listeners.length > -1)
            return listeners[0]
        throw Error('Do not exist')
    }

    /** check is listener is active */
    public isActive(reader: any, client: string, type: string): boolean {
        return this.getListener(reader, client, type).active
    }

    /** active or deactivate listener */
    public activeListener(reader: any, client: string, type: string, val: boolean) {
        this.getListener(reader, client, type).active = val
    }

    /** return list of listeners */
    public getListeners(): Array<Listener> {
        return this._arr;
    }
}

/**
 * Inner helper class to store current state of readers listeners.
 * */
class Listener {
    public offset: string;
    public client: string; //Client name who call it
    public callback: Function; //Function reference to handle listener
    public type: string; //Listener type ex. 'data'
    public reader: any;  //Exact reader path
    public active: boolean;  //Mark callback as active or not (not affect normal listener)

    constructor(offset: string, client: string, callback: Function, type: string, reader: any, active?: boolean) {
        this.offset = offset;
        this.client = client;
        this.callback = callback;
        this.type = type;
        this.reader = reader;
        this.active = !!active;
    }
}

