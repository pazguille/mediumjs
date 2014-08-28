var medium = require('../');

describe('MediumJS', function () {
  var listener,
      listener2;

  beforeEach(function() {
    listener = jasmine.createSpy('listener'),
    listener2 = jasmine.createSpy('listener2');
  });

  describe('Instance', function() {
    it('Should return an instance of Medium', function () {
      expect(medium).toBeDefined();
      expect(typeof medium).toEqual('object');
    });
  });

  describe('Public properties', function() {
    it('Should be defined "channels" property.', function () {
      expect(medium.channels).toBeDefined();
      expect(typeof medium.channels).toEqual('object');
    });
  });

  describe('Public methods', function() {
    it('Should be defined "subscribe" method', function () {
      expect(medium.subscribe).toBeDefined();
      expect(typeof medium.subscribe).toEqual('function');
    });

    it('Should be defined "publish" method', function () {
      expect(medium.publish).toBeDefined();
      expect(typeof medium.publish).toEqual('function');
    });

    it('Should be defined "remove" method', function () {
      expect(medium.remove).toBeDefined();
      expect(typeof medium.remove).toEqual('function');
    });
  });

  describe('.subscribe(channel, listener)', function () {
    it('Should receive parameters', function () {
      expect(function(){
        medium.subscribe();
      }).toThrow();

      expect(function(){
        medium.subscribe('channel');
      }).toThrow();

      expect(function(){
        medium.subscribe(listener);
      }).toThrow();

      expect(function () {
        medium.subscribe('channel', listener);
      }).not.toThrow();
     });

    it('Should subscribe all listeners into the given channel', function () {
      medium.subscribe('channel', listener);
      medium.subscribe('channel', listener2);

      expect(medium.channels['channel']).toBeDefined();
      expect(Array.isArray(medium.channels['channel'])).toBeTruthy();
      expect(medium.channels['channel']).toContain(listener);
      expect(medium.channels['channel']).toContain(listener2);
      expect(medium.channels['channel']).not.toContain('quux');
    });
  });

  describe('.publish(channel, [arg1], [arg2], [...])', function () {
    it('Should call all listeners when it publish a channel', function () {
      medium.subscribe('something', listener);
      medium.subscribe('something', listener2);

      medium.publish('something');

      expect(listener).toHaveBeenCalled();
      expect(listener2).toHaveBeenCalled();
    });

    it('Tracks all the arguments of its calls.', function () {
      medium.subscribe('something', listener);
      medium.subscribe('something', listener2);
      medium.publish('something', 'data1', 'data2', 'data3');

      expect(listener).toHaveBeenCalledWith('data1', 'data2', 'data3');
      expect(listener2).toHaveBeenCalledWith('data1', 'data2', 'data3');
    });
  });

  describe('.remove(channel, listener)', function () {
    it('Should receive parameters', function () {
      medium.subscribe('something', listener);
      expect(function(){
        medium.remove();
      }).toThrow();

      expect(function(){
        medium.remove(listener);
      }).toThrow();

      expect(function () {
        medium.remove('something', listener);
      }).not.toThrow();
    });

    it('Should remove the given listener', function () {
      medium.subscribe('something', listener);
      medium.subscribe('something', listener2);

      medium.remove('something', listener);

      medium.publish('something');

      expect(listener).not.toHaveBeenCalled();
    });

    it('Should remove the given channel', function () {
      medium.subscribe('something', listener);

      medium.remove('something');

      expect(medium.channels['something']).not.toBeDefined();

      medium.publish('something');

      expect(listener).not.toHaveBeenCalled();
    });

  });
});