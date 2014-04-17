RateLimit
=========

Easily rate-limit a function to run no more often than every X miliseconds, by *queuing up* calls. All calls will be
eventually executed, unlike [throttling](http://drupalmotion.com/article/debounce-and-throttle-visual-explanation)
or [debouncing](http://blogorama.nerdworks.in/entry-JavaScriptfunctionthrottlingan.aspx), which drop extra calls.

This is useful for API clients, web crawling, or other tasks that need to wait at least some amount of time
between calls, but for which throttling per se (dropping calls) is unacceptable.

Uses a private queue, as suggested in [this StackOverflow question](http://stackoverflow.com/questions/23072815/throttle-javascript-function-calls-but-with-queuing-dont-discard-calls).

## Installation

RateLimit can be installed with [Meteorite](https://github.com/oortcloud/meteorite/). From inside a Meteorite-managed app:

```bash
$ mrt add rate-limit
```


## Usage

Simply run `var fooLimited = rateLimit(foo, delayInMilliseconds);`.

Example:

```javascript
function foo(param1, param2) {
  console.log(param1, (param2 || ''));
}

var bar = rateLimit(foo, 1000);  // wait at least 1000 milliseconds between calls
foo('Starting up');
bar(1);  // runs right away
bar(2);  // runs after 1 second
bar(3, 'optional parameter');  // parameters are passed along to the original function
```

## TODO

* Meteor.Collection backing for persistence


## See also

* [PowerQueue](https://github.com/CollectionFS/Meteor-powerqueue) - powerful native Meteor package for job queue processing, but [without scheduling capabilities](https://github.com/CollectionFS/Meteor-power-queue/issues/15)
* [limiter](https://github.com/jhurliman/node-rate-limiter) - A generic rate limiter for Node.js


## Author, license and copyright

Author: Dan Dascalescu ([@dandv](http://github.com/dandv))

Copyright (c) 2014 StockBase, LLC.

The MIT License (MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
