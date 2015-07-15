Package.describe({
  name: 'wesleyfsmith:pulsarjs-navbar',
  version: '0.0.1',
  documentation: 'https://github.com/isomer-io/pulsarjs/blob/master/readme.md',
  git: 'https://github.com/isomer-io/pulsarjs'
});

Package.onUse(function(api) {
  api.use(["templating",'tracker','session'], "client");

  api.use("meteorhacks:async@1.0.0", "server");

  api.use([
    "orionjs:core@1.1.0",
    "iron:router@1.0.9",
    "meteorhacks:async@1.0.0",
    "spacebars","ongoworks:security","nicolaslopezj:roles", 'wesleyfsmith:pulsarjs-config'
  ], ["client", "server"]);

  api.versionsFrom('METEOR@1.1.0.2');

  //REVIEWS
  api.addFiles(['lib/client/loadingbar.css'], 'client');
  api.addFiles(['lib/client/navbar.html'], 'client');
  api.addFiles(['lib/client/navbar.js'], 'client');
  api.addFiles(['lib/server/navdict.js'], 'server');

  api.export('Navbar');


});
