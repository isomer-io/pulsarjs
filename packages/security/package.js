Package.describe({
  name: 'pulsarjs:security',
  version: '0.0.1',
  summary: 'Security for pulsarjs',
  git: 'https://github.com/isomer-io/pulsarjs'
});

Package.onUse(function(api) {
  api.use(["templating",'tracker','session'], "client");

  api.use("meteorhacks:async@1.0.0", "server");

  api.use([
    "mrgalaxy:stripe@2.1.0",
    "orionjs:core@1.1.0",
    "iron:router@1.0.9",
    "meteorhacks:async@1.0.0",
    "spacebars","ongoworks:security@1.2.0","nicolaslopezj:roles@1.1.2"
  ], ["client", "server"]);

  api.versionsFrom('METEOR@1.1.0.2');


  //CUSTOM ROLES
  api.addFiles(['server/lib/nicholasroles.js'],'server');
  // api.addFiles(['lib/roles.js'], ['client', 'server']);

  // api.export('UserRole');
  // api.export('AdminRole');



});
