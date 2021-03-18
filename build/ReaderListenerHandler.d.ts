/// <reference types="node" />
import EventEmitter from "events";
/**
 * Helper singleton class to handle listener management for readers
 */
export declare class ReaderListenerHandler extends EventEmitter {
    private static instance;
    private _arr;
    private constructor();
    /** Singleton get instance */
    static getInstance(reset?: boolean): ReaderListenerHandler;
    /** Perform some validation before adding Listener */
    validateAndAddListener(offset: string, handler: Function, reader: any, client: string, type: string, timeout?: number): Promise<Listener>;
    /** add listener to the reader and register it in arr */
    saveNewListener(offset: string, handler: Function, reader: any, client: string, type: string, timeout?: number): Listener;
    /** check is Lister exist for particular client and reader*/
    isExist(reader: any, client: string): boolean;
    /** check listener max instances (default: 10 per reader) */
    isMaxSize(reader: any): boolean;
    /** remove listener from reader and unregister it */
    removeOldListener(reader: any, client: string, type: string, offset?: string): void;
    /** Remove all listeners */
    empty(): void;
    /** return only one listener */
    getListener(reader: any, client: string, type: string): Listener;
    /** check is listener is active */
    isActive(reader: any, client: string, type: string): boolean;
    /** active or deactivate listener */
    activeListener(reader: any, client: string, type: string, val: boolean): void;
    /** return list of listeners */
    getListeners(): Array<Listener>;
}
/**
 * Inner helper class to store current state of readers listeners.
 * */
declare class Listener {
    offset: string;
    client: string;
    callback: Function;
    type: string;
    reader: any;
    active: boolean;
    constructor(offset: string, client: string, callback: Function, type: string, reader: any, active?: boolean);
}
export {};
