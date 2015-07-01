Package.describe({
  name: 'pulsar-config',
  version: '0.0.1',
  summary: '',
  documentation: ''
});

Package.onUse(function(api) {
  api.use(["templating",'tracker','session'], "client");

  api.use("meteorhacks:async@1.0.0", "server");

  api.use([
    "mrgalaxy:stripe@2.1.0",
    "orionjs:core@1.1.0",
    "iron:router@1.0.9",
    "meteorhacks:async@1.0.0",
    "spacebars","ongoworks:security","nicolaslopezj:roles", 'alethes:pages'
  ], ["client", "server"]);

  api.versionsFrom('METEOR@1.1.0.2');

  //CONFIG STUFF
  api.addFiles(['appLayout.html'], 'client');
  api.addFiles(['bottomSpacing.css'], 'client');
  api.addFiles(['htmlExtras.html'], 'client');

  api.addFiles(['lib/ClientInvoke/ClientCall.js',
    'lib/config.js'], ['client', 'server']);

  api.export('LaunchBox');


});