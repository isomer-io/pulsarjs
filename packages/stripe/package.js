Package.describe({
  name: 'stripe',
  version: '0.0.1',
  summary: 'A simplified version of https://github.com/tyler-johnson/stripe-meteor',
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
    'connectToStripeButtonTemplate.html', 'StripeOauthTemplate.html', 'StripeCode.js','server/StripeServerCode.js',
    'client/StripeClientCode.js'], 'client');
  
  api.export('createCustomer', 'client');
  api.export('createCharge', 'client');
});