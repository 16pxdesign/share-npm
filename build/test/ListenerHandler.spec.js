"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const events_1 = __importDefault(require("events"));
const ReaderListenerHandler_1 = require("../ReaderListenerHandler");
describe('ListenerHandler', () => {
    class Device extends events_1.default {
        constructor() {
            super(...arguments);
            this.path = 'path';
        }
    }
    let type = 'type';
    const client = 'test';
    function fn() {
    }
    ;
    it('Is listener is added to emitter', () => {
        const eventEmitter = new Device();
        ReaderListenerHandler_1.ReaderListenerHandler.getInstance(true).saveNewListener('0', fn, eventEmitter, client, type);
        chai_1.expect(ReaderListenerHandler_1.ReaderListenerHandler.getInstance().getListeners().length).to.equal(1);
        chai_1.expect(eventEmitter.listeners('type').length).to.equal(1);
    });
    it('Is remove correctly', () => {
        const eventEmitter = new Device();
        ReaderListenerHandler_1.ReaderListenerHandler.getInstance(true).saveNewListener('0', fn, eventEmitter, client, type);
        chai_1.expect(ReaderListenerHandler_1.ReaderListenerHandler.getInstance().getListeners().length).to.equal(1);
        chai_1.expect(eventEmitter.listeners(type).length).to.equal(1);
        //Remove
        ReaderListenerHandler_1.ReaderListenerHandler.getInstance().removeOldListener(eventEmitter, client, type);
        chai_1.expect(ReaderListenerHandler_1.ReaderListenerHandler.getInstance().getListeners().length).to.equal(0);
        chai_1.expect(eventEmitter.listeners(type).length).to.equal(0);
    });
    it('Is listener handle messages', () => {
        const eventEmitter = new Device();
        let message = '';
        function handler(data) {
            message = data;
        }
        ;
        ReaderListenerHandler_1.ReaderListenerHandler.getInstance(true).saveNewListener('0', handler, eventEmitter, client, type);
        eventEmitter.emit(type, 'emitter');
        chai_1.expect(message).to.equal('emitter');
    });
    it('Remove all listeners', () => {
        const eventEmitter = new Device();
        ReaderListenerHandler_1.ReaderListenerHandler.getInstance(true).saveNewListener('0', fn, eventEmitter, client, type);
        ReaderListenerHandler_1.ReaderListenerHandler.getInstance().saveNewListener('1', fn, eventEmitter, client, type);
        ReaderListenerHandler_1.ReaderListenerHandler.getInstance().empty();
        chai_1.expect(ReaderListenerHandler_1.ReaderListenerHandler.getInstance().getListeners().length).to.equal(0);
        chai_1.expect(eventEmitter.listeners(type).length).to.equal(0);
    });
    it('Remove similar listeners', () => {
        const eventEmitter = new Device();
        ReaderListenerHandler_1.ReaderListenerHandler.getInstance(true).saveNewListener('0', fn, eventEmitter, client, type);
        ReaderListenerHandler_1.ReaderListenerHandler.getInstance().saveNewListener('1', fn, eventEmitter, client, type);
        ReaderListenerHandler_1.ReaderListenerHandler.getInstance().removeOldListener(eventEmitter, client, type);
        chai_1.expect(ReaderListenerHandler_1.ReaderListenerHandler.getInstance().getListeners().length).to.equal(1);
        chai_1.expect(eventEmitter.listeners(type).length).to.equal(1);
    });
    it('Is timeout delete work', () => {
        const eventEmitter = new Device();
        ReaderListenerHandler_1.ReaderListenerHandler.getInstance(true).saveNewListener('0', fn, eventEmitter, client, type, 10000);
        chai_1.expect(ReaderListenerHandler_1.ReaderListenerHandler.getInstance().getListeners().length).to.equal(1);
        chai_1.expect(eventEmitter.listeners(type).length).to.equal(1);
        setTimeout(() => {
            chai_1.expect(ReaderListenerHandler_1.ReaderListenerHandler.getInstance().getListeners().length).to.equal(0);
            chai_1.expect(eventEmitter.listeners(type).length).to.equal(0);
        }, 12000);
    });
    it('Is listener is validated before added to emitter', () => {
        const eventEmitter = new Device();
        ReaderListenerHandler_1.ReaderListenerHandler.getInstance(true).validateAndAddListener('0', fn, eventEmitter, client, type);
        chai_1.expect(ReaderListenerHandler_1.ReaderListenerHandler.getInstance().getListeners().length).to.equal(1);
        chai_1.expect(eventEmitter.listeners('type').length).to.equal(1);
    });
    it('Replace duplicates before added to emitter', () => {
        const eventEmitter = new Device();
        ReaderListenerHandler_1.ReaderListenerHandler.getInstance(true).validateAndAddListener('0', fn, eventEmitter, client, type);
        ReaderListenerHandler_1.ReaderListenerHandler.getInstance().validateAndAddListener('1', fn, eventEmitter, client, type);
        chai_1.expect(ReaderListenerHandler_1.ReaderListenerHandler.getInstance().getListeners().length).to.equal(1);
        chai_1.expect(eventEmitter.listeners('type').length).to.equal(1);
    });
});
