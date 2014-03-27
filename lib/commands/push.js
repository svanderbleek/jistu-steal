var options = require('../../app.js').argv,
  utile = require('utile'),
  childProcess = require('child_process');

var commandExecutor = function(callback) {
  return function(command, args) {
    console.log(command, args);
    var execution = childProcess.spawn(command, args);
    execution.stdout.on('data', display);
    execution.stderr.on('data', display);
    execution.on('close', callback);
  }
}

var argumentProcessor = function(callback) {
  return function(argument) {
    var executor = commandExecutor(callback);
    pushToApp(argument, executor);
  }
}

var display = function(data) {
  console.log(data.toString());
}

var afterCompletions = function(count, callback) {
  return function() {
    console.log(count);
    if(--count == 0) {
      callback();
    }
  }
}

var pushToApp = function(variable, execute) {
  var value = process.env[variable];
  execute('jitsu', ['env', 'set', variable, value]);
}

module.exports = function () {
  var args = utile.args(arguments);
  var complete = afterCompletions(args.length, args.callback);
  args.forEach(argumentProcessor(complete));
}
