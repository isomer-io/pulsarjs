Package.describe({
  name: 'pulsarjs:config',
  version: '0.0.1',
  git: 'https://github.com/isomer-io/pulsarjs',
  summary: 'config for pulsarjs'
});

Package.onUse(function(api) {
  api.use(["templating",'tracker','session'], "client");

  api.use("meteorhacks:async@1.0.0", "server");

  api.use([
    "mrgalaxy:stripe@2.1.0",
    "orionjs:core@1.1.0",
    "iron:router@1.0.9",
    "meteorhacks:async@1.0.0",
    "spacebars","ongoworks:security@1.2.0","nicolaslopezj:roles@1.1.2", 'alethes:pages@1.8.4', 'fourseven:scss@3.2.0', 'reywood:bootstrap3-sass@3.3.5_1'
  ], ["client", "server"]);

  api.versionsFrom('METEOR@1.1.0.2');

  //CONFIG STUFF

  api.addFiles(['appLayout.html'], 'client');
  api.addFiles(['bottomSpacing.css'], 'client');
  api.addFiles(['footer/footer.html'], 'client');
  api.addFiles(['htmlExtras.html'], 'client');

  api.addFiles(['lib/ClientInvoke/ClientCall.js',
    'lib/config.js'], ['client', 'server']);

  api.export('LaunchBox');


});
