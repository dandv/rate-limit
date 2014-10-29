rateLimit
=========

Easily rate-limit a function to run no more often than every X miliseconds, 
by *queuing up* calls. All calls will be eventually executed, unlike 
[throttling](http://drupalmotion.com/article/debounce-and-throttle-visual-explanation)
or [debouncing](http://blogorama.nerdworks.in/entry-JavaScriptfunctionthrottlingan.aspx), 
which drop extra calls.

This is useful for API clients, web crawling, or other tasks that need to wait 
at least some amount of time between calls, but for which throttling per se 
(dropping calls) is unacceptable.

On the server, you can use [futures](https://eventedmind.com/feed/nodejs-using-futures) 
to allow returning a value from the rate-limited function. On the client, this 
is not yet implemented, but [possible](http://stackoverflow.com/questions/3249646/client-side-javascript-to-support-promises-futures-etc).

A private queue is used internally, as suggested [on StackOverflow](http://stackoverflow.com/questions/23072815/throttle-javascript-function-calls-but-with-queuing-dont-discard-calls).

## Installation

```bash
$ meteor add rate-limit
```


## Example:

Simply run `var fooLimited = rateLimit(foo, delayInMilliseconds);`.

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

## Usage

    rateLimit(function, delayInMilliseconds, context /* default this */, options)
    
Parameters

* `function` to call
* minimum `delayInMilliseconds` to wait before consecutive calls to `function`
* [context](http://stackoverflow.com/a/23073178/1269037) to pass (defaults to `this`)
* options:
  * `debug`: boolean - default `false`. Logs to the console the number of items in the queue after each call to `function`
  * `futures`: boolean - default `false`. **MUST** be enabled if you need the return value of `function`. Will yield execution of next statement (not block) until `function` returns.


## TODO

* [client-side support for returning values](http://stackoverflow.com/questions/3249646/client-side-javascript-to-support-promises-futures-etc)
* Meteor.Collection backing for persistence


## See also

* [jobCollection](http://github.com/vsivsi/meteor-job-collection) - powerful native Meteor package for job queue processing
* [limiter](https://github.com/jhurliman/node-rate-limiter) - A generic rate limiter for Node.js


## Author, license and copyright

Author: Dan Dascalescu ([@dandv](http://github.com/dandv))

Development initially sponsored by [StockBase](http://stockbase.com), LLC.

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
