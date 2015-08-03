Package.describe({
  name: 'pulsarjs:core',
  version: '0.0.2',
  git: 'https://github.com/isomer-io/pulsarjs',
  summary: 'Core for pulsarjs'
});

Package.onUse(function(api) {
  api.use(["templating",'tracker','session'], "client");

  api.use("meteorhacks:async@1.0.0", "server");

  api.use([
    "mrgalaxy:stripe@2.1.0",
    "orionjs:core@1.1.0",
    "iron:router@1.0.9",
    "meteorhacks:async@1.0.0",
    "spacebars", 'alethes:pages@1.8.4',
      'pulsarjs:security@0.0.1',
      'pulsarjs:config@0.0.1',
      'pulsarjs:payments@0.0.2',
      'pulsarjs:reviews@0.0.1','pulsarjs:imagecrop@0.0.1'
  ], ["client", "server"]);

  api.versionsFrom('METEOR@1.1.0.2');

  api.export('Pulsar');

});
