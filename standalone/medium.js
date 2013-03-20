(function (window) {
    'use strict';

    function Medium () {
        this.channels = {};

        return this;
    }

    Medium.prototype.subscribe = function (channel, listener) {

        if (channel === undefined || listener === undefined) {
            throw new window.Error('Medium.subscribe(channel, listener): It should receive a channel and listener as paramaters.');
        }

        this.channels[channel] = this.channels[channel] || [];
        this.channels[channel].push(listener);

        return this;
    };

    Medium.prototype.publish = function () {
        var args = Array.prototype.slice.call(arguments, 0), // converted to array
            channel = args.shift(),
            i = 0,
            len,
            listeners;

        if (channel === undefined) {
            throw new window.Error('Medium.publish(channel, args): It should receive a channel as paramater.');
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
     * Expose Medium
     */
    // AMD suppport
    if (typeof window.define === 'function' && window.define.amd !== undefined) {
        window.define('medium', [], function () {
            return Medium;
        });

    // CommonJS suppport
    } else if (typeof module !== 'undefined' && module.exports !== undefined) {
        module.exports = Medium;

    // Default
    } else {
        window.Medium = Medium;
    }
}(this));