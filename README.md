# Medium JS

A small library that implements the Mediator Pattern in JavaScript. The essence of the Mediator Pattern is to Define an object that encapsulates how a set of objects interact. Mediator promotes loose coupling by keeping objects from referring to each other explicitly, and it lets you vary their interaction independently".

[Read more](http://en.wikipedia.org/wiki/Mediator_pattern).

## Installation

    $ component install pazguille/mediumjs

See: [https://github.com/component/component](https://github.com/component/component)

### Standalone
Also, you can use the standalone version without components.
```html
<script src="../standalone/medium.js"></script>
```

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
Adds a listener to given `channel`.
- `channel` - The name of the channel you want to subscribe.
- `listener` - Listener you want to execute to given channel.

```js
medium.subscribe('greet', informal);
```

### Medium#publish(channel, [arg1], [arg2], [...])
Execute each item in the listener collection in order with given data.
- `channel` - The name of the channel you want to subscribe.

```js
medium.publish('greet', 'Hi pazguille!', 'Bye pazguille!');
```

### Medium#remove(channel, listener)
Removes one or all listeners from the collection with given channel.
- `channel` - The name of the channel you want to remove.
- `listener` (optional) - Listener you want to remove from given channel.

```js
// removes a specific listener from the given channel
medium.remove('greet', informal);

// removes all listeners and the channel
medium.remove('greet');
```

## Contact
- Guillermo Paz (Frontend developer - JavaScript developer | Web standards lover)
- E-mail: [guille87paz@gmail.com](mailto:guille87paz@gmail.com)
- Twitter: [@pazguille](http://twitter.com/pazguille)
- Web: [http://pazguille.me](http://pazguille.me)

## License
### The MIT License
Copyright (c) 2013 [@pazguille](http://twitter.com/pazguille)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.