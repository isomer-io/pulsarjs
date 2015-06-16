Package.describe({
  name: 'maxjohansen:simplestripe',
  version: '0.2.0',
  summary: 'A simplified version of https://github.com/tyler-johnson/stripe-meteor',
  git: 'https://github.com/macsj200/simplestripe',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.use(["templating"], "client");
  api.use(["tracker"], "client");
  api.use(["session"], "client");
  api.use(["mrgalaxy:stripe@2.1.0","orionjs:core@1.1.0","meteorhacks:async@1.0.0"], ["client", "server"]);
  api.use("iron:router", ["client", "server"]);
  api.use("spacebars", ["client", "server"]);
  api.use("meteorhacks:async@1.0.0", "server");
  api.versionsFrom('METEOR@1.1.0.2');
  api.addFiles('StripeCode.js', 'server');
  api.addFiles(['payForItemButtonTemplate.html','payForItem.html',
    'connectToStripeButtonTemplate.html', 'StripeOauthTemplate.html', 'StripeCode.js','client/derp/lib/StripeClientCode.js',
  'server/lib/StripeServerCode.js'], 'client');
  
  api.export('createCustomer', 'client');
  api.export('createCharge', 'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('maxjohansen:simplestripe');
  //api.addFiles('simplestripe-tests.js');
});
