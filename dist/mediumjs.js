/*!
 * mediumjs - v0.0.1
 *
 * Copyright (c) 2014, @pazguille <guille87paz@gmail.com>
 * Released under the MIT license.
 */
(function(window) {
'use strict';

/**
 * Creates mediator object that handles communication with multiple objects.
 * @constructor
 * @property {object} channels
 * @returns {object}
 */
function Medium() {
  this.channels = {};
  return this;
}

/**
 * Adds a listener to given channel.
 * @param {string} channel - The name of the channel you want to subscribe.
 * @param {function} listener - Listener function.
 */
Medium.prototype.subscribe = function (channel, listener) {

  if (channel === undefined || listener === undefined) {
    throw new window.Error('Medium.subscribe(channel, listener): It should receive a channel and listener as paramaters.');
  }

  this.channels[channel] = this.channels[channel] || [];
  this.channels[channel].push(listener);

  return this;
};

/**
 * Execute each item in the listener collection in order with given data.
 * @param {string} channel - The name of the channel you want to subscribe.
 */
Medium.prototype.publish = function () {
  var args = Array.prototype.slice.call(arguments, 0), // converted to array
      channel = args.shift(),
      i = 0,
      len,
      listeners;

  if (channel === undefined) {
    throw new window.Error('Medium.publish(channel, [arg1], [arg2], [...]): It should receive a channel as paramater.');
  }

  listeners = this.channels[channel];

  if (listeners !== undefined) {
    len = listeners.length;
    for (i; i < len; i += 1) {
      listeners[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Removes one or all listeners from the collection with given channel.
 * @param {string} channel - The name of the channel you want to remove.
 * @param {function} listener - Listener you want to remove from given channel.
 */
Medium.prototype.remove = function (channel, listener) {

  if (channel === undefined) {
    throw new window.Error('Medium.remove(channel, listener): It should receive a channel as paramater.');
  }

  var len = this.channels[channel].length;

  if (listener !== undefined) {
    while (len) {
      if (this.channels[channel][len -= 1] === listener) {
        this.channels[channel].splice(len, 1);
        break;
      }
    }
  }

  if (listener === undefined || this.channels[channel].length === 0) {
    delete this.channels[channel];
  }

  return this;
};


/**
 * Expose Medium instance
 */
// AMD
if (typeof window.define === 'function' && window.define.amd !== undefined) {
  window.define('medium', [], function () {
    return new Medium();
  });
// CommonJS
} else if (typeof module !== 'undefined' && module.exports !== undefined) {
  module.exports = new Medium();
// Browser
} else {
  window.medium = new Medium();
};

}(this));