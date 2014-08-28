# Medium JS [![Build Status](https://secure.travis-ci.org/pazguille/mediumjs.png)](http://travis-ci.org/pazguille/mediumjs) [![devDependency Status](https://david-dm.org/pazguille/mediumjs/dev-status.png)](https://david-dm.org/pazguille/mediumjs#info=devDependencies)

A small library that implements the Mediator Pattern in JavaScript. The essence of the Mediator pattern is to "Define an object that encapsulates how a set of objects interact. Mediator promotes loose coupling by keeping objects from referring to each other explicitly, and it lets you vary their interaction independently". [Read more](http://en.wikipedia.org/wiki/Mediator_pattern)

Medium makes use of the Mediator pattern and the difference of the Mediator pattern over the Observer pattern is that a single object is responsible for communication. [Read more](http://stackoverflow.com/questions/9226479/mediator-vs-observer)

## Installation

    $ npm install mediumjs

    $ bower install mediumjs

    $ component install pazguille/mediumjs

See: [https://github.com/component/component](https://github.com/component/component)


## How-to

First, requires the mediator instance:
```js
var medium = require('medium');
```

Now, defines a listener and subcribes to a channel:
```js
function informal(arg1, arg2) {
    alert(arg1);
    alert(arg2);
});

medium.subscribe('greet', informal);
```

Then, broadcasts a channel with some data:
```js
medium.publish('greet', 'Hi pazguille!', 'Bye pazguille!');
```

## API

### Medium#subscribe(channel, listener)
Adds a `listener` to given `channel`.
- `channel` - The name of the channel you want to subscribe.
- `listener` - Listener you want to execute to given channel.

```js
medium.subscribe('greet', informal);
```

### Medium#publish(channel, [arg1], [arg2], [...])
Execute each item in the `listener` collection in order with given `parameters`.
- `channel` - The name of the channel you want to subscribe.

```js
medium.publish('greet', 'Hi pazguille!', 'Bye pazguille!');
```

### Medium#remove(channel, listener)
Removes one or all `listeners` from the collection with given `channel`.
- `channel` - The name of the channel you want to remove.
- `listener` (optional) - Listener you want to remove from given channel.

```js
// removes a specific listener from the given channel
medium.remove('greet', informal);

// removes all listeners and the channel
medium.remove('greet');
```

## Maintained by
- Guille Paz (Front-end developer | Web standards lover)
- E-mail: [guille87paz@gmail.com](mailto:guille87paz@gmail.com)
- Twitter: [@pazguille](http://twitter.com/pazguille)
- Web: [http://pazguille.me](http://pazguille.me)

## License
Licensed under the MIT license.

Copyright (c) 2013 [@pazguille](http://twitter.com/pazguille).