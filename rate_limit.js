var Future;  // server-side support for returning values - eventedmind.com/feed/nodejs-using-futures
if (Meteor.isServer) Future = Npm.require('fibers/future');  // for client-side futures support, TODO http://stackoverflow.com/questions/3249646/client-side-javascript-to-support-promises-futures-etc

rateLimit = function(fn, delay, context, options) {
  var queue = [], timer = null;

  function processQueue() {
    var item = queue.shift();
    if (item) {
      var result = fn.apply(item.context, item.arguments);
      // resolve this particular future; execution continues after future.return()
      if (item.future) item.future.return(result);
    }
    if (options && options.debug)
      console.log('rateLimit queue size after executing last item:', queue.length);
    if (queue.length === 0)
      clearInterval(timer), timer = null;
  }

  return function limited() {
    var future = Meteor.isServer && options && options.futures && new Future();  // each invocation needs a future
    queue.push({
      context: context || this,
      arguments: [].slice.call(arguments),
      future: future
    });
    if (!timer) {
      processQueue();  // start immediately on the first invocation
      timer = Meteor.setInterval(processQueue, delay);
    }
    return future && future.wait();  // resolved in processQueue
  }

};
