Package.describe({
  name: 'pulsarjs:navbar',
  version: '0.0.1',
  summary: 'Navbar for pulsarjs',
  git: 'https://github.com/isomer-io/pulsarjs'
});

Package.onUse(function(api) {
  api.use(["templating",'tracker','session'], "client");

  api.use("meteorhacks:async@1.0.0", "server");

  api.use([
    "orionjs:core@1.1.0",
    "iron:router@1.0.9",
    "meteorhacks:async@1.0.0",
    "spacebars","ongoworks:security@1.2.0","nicolaslopezj:roles@1.1.2", 'pulsarjs:config@0.0.1'
  ], ["client", "server"]);

  api.versionsFrom('METEOR@1.1.0.2');

  //REVIEWS
  api.addFiles(['lib/client/loadingbar.css'], 'client');
  api.addFiles(['lib/client/navbar.html'], 'client');
  api.addFiles(['lib/client/navbar.js'], 'client');
  api.addFiles(['lib/server/navdict.js'], 'server');

  api.export('Navbar');


});
