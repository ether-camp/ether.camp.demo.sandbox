define(function(require, exports, module) {
  main.consumes = ['Plugin', 'info', 'commands'];
  main.provides = ['ether.camp.demo.sandbox'];
  return main;

  function main(options, imports, register) {
    var Plugin = imports.Plugin;
    var info = imports.info;
    var commands = imports.commands;

    var async = require('async');  
    var Service = require('../dist/service.min.js');
    var service = Object.create(Service);
  
    var plugin = new Plugin('ether.camp', main.consumes);
    
    plugin.on('load', function() {
      async.parallel({
        user: info.getUser,
        workspace: info.getWorkspace
      }, function(err, results) {
        if (err) return console.error(err);
        service.init(results.user.name, results.workspace.name);
      });
    });

    commands.addCommand({
      name: 'askSandbox',
      exec: function() {
        service.isConnected(function(err, connected) {
          if (err) return console.error(err);
          console.log('connected ' + connected);
        });
      }
    }, plugin);
  
    register(null, {
        'ether.camp.demo.sandbox': plugin
    });
  }
});