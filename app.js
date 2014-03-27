var flatiron = require('flatiron'),
    path = require('path'),
    app = flatiron.app;

module.exports = app;

app.use(flatiron.plugins.cli, {
  source: path.join(__dirname, 'lib', 'commands'),
  usage: ['jitsu-steal push *variables'],
});

app.start();
