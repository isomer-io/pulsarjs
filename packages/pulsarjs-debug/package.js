Package.describe({
  name: 'wesleyfsmith:pulsarjs-debug',
  version: '0.0.1',
  summary: '',
  documentation: ''
});

Package.onUse(function(api) {
  api.use([
    "orionjs:core@1.1.0",
    "meteorhacks:kadira",
  ], ["client", "server"]);

  api.versionsFrom('METEOR@1.1.0.2');

  api.addFiles(['code/lib/KadiraOrionConfig.js'], ['client', 'server']);

  api.addFiles('code/lib/server/KadiraConfig.js','server');
});
