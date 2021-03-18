import {expect} from 'chai';
import EventEmitter from "events";
import {ReaderListenerHandler} from "../ReaderListenerHandler";


describe('ListenerHandler', () => {
    class Device extends EventEmitter {
        path = 'path'
    }

    let type = 'type'
    const client = 'test'

    function fn() {
    };


    it('Is listener is added to emitter', () => {
        const eventEmitter = new Device();
        ReaderListenerHandler.getInstance(true).saveNewListener('0',fn, eventEmitter, client, type)
        expect(ReaderListenerHandler.getInstance().getListeners().length).to.equal(1)
        expect(eventEmitter.listeners('type').length).to.equal(1)
    })

    it('Is remove correctly', () => {
        const eventEmitter = new Device();
        ReaderListenerHandler.getInstance(true).saveNewListener('0',fn, eventEmitter, client, type)
        expect(ReaderListenerHandler.getInstance().getListeners().length).to.equal(1)
        expect(eventEmitter.listeners(type).length).to.equal(1)
        //Remove
        ReaderListenerHandler.getInstance().removeOldListener(eventEmitter, client, type);
        expect(ReaderListenerHandler.getInstance().getListeners().length).to.equal(0)
        expect(eventEmitter.listeners(type).length).to.equal(0)
    })


    it('Is listener handle messages', () => {
        const eventEmitter = new Device();
        let message = '';

        function handler(data: string) {
            message = data
        };
        ReaderListenerHandler.getInstance(true).saveNewListener('0',handler, eventEmitter, client, type);
        eventEmitter.emit(type, 'emitter');
        expect(message).to.equal('emitter');
    })

    it('Remove all listeners', () => {
        const eventEmitter = new Device();
        ReaderListenerHandler.getInstance(true).saveNewListener('0',fn, eventEmitter, client, type)
        ReaderListenerHandler.getInstance().saveNewListener('1',fn, eventEmitter, client, type)
        ReaderListenerHandler.getInstance().empty();
        expect(ReaderListenerHandler.getInstance().getListeners().length).to.equal(0)
        expect(eventEmitter.listeners(type).length).to.equal(0)
    })

    it('Remove similar listeners', () => {
        const eventEmitter = new Device();
        ReaderListenerHandler.getInstance(true).saveNewListener('0',fn, eventEmitter, client, type)
        ReaderListenerHandler.getInstance().saveNewListener('1',fn, eventEmitter, client, type)
        ReaderListenerHandler.getInstance().removeOldListener(eventEmitter, client, type);
        expect(ReaderListenerHandler.getInstance().getListeners().length).to.equal(1)
        expect(eventEmitter.listeners(type).length).to.equal(1)
    })


    it('Is timeout delete work', () => {
        const eventEmitter = new Device();
        ReaderListenerHandler.getInstance(true).saveNewListener('0',fn, eventEmitter, client, type, 10_000)
        expect(ReaderListenerHandler.getInstance().getListeners().length).to.equal(1)
        expect(eventEmitter.listeners(type).length).to.equal(1)
        setTimeout(() => {
            expect(ReaderListenerHandler.getInstance().getListeners().length).to.equal(0)
            expect(eventEmitter.listeners(type).length).to.equal(0)
        }, 12_000)

    })

    it('Is listener is validated before added to emitter', () => {
        const eventEmitter = new Device();
        ReaderListenerHandler.getInstance(true).validateAndAddListener('0',fn, eventEmitter, client, type)
        expect(ReaderListenerHandler.getInstance().getListeners().length).to.equal(1)
        expect(eventEmitter.listeners('type').length).to.equal(1)
    })


    it('Replace duplicates before added to emitter', () => {
        const eventEmitter = new Device();
        ReaderListenerHandler.getInstance(true).validateAndAddListener('0',fn, eventEmitter, client, type)
        ReaderListenerHandler.getInstance().validateAndAddListener('1',fn, eventEmitter, client, type)
        expect(ReaderListenerHandler.getInstance().getListeners().length).to.equal(1)
        expect(eventEmitter.listeners('type').length).to.equal(1)
    })


})