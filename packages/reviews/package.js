Package.describe({
  name: 'pulsarjs:reviews',
  version: '0.0.1',
  summary: 'Reviews for pulsarjs',
  git: 'https://github.com/isomer-io/pulsarjs'
});

Package.onUse(function(api) {
  api.use(["templating",'tracker','session'], "client");

  api.use("meteorhacks:async@1.0.0", "server");

  api.use([
    'alethes:pages@1.8.4',
    "orionjs:core@1.1.0",
    "iron:router@1.0.9",
    "meteorhacks:async@1.0.0",
    "spacebars","ongoworks:security@1.2.0","nicolaslopezj:roles@1.1.2", 'pulsarjs:config@0.0.1', 'pulsarjs:payments@0.0.1'
  ], ["client", "server"]);

  api.versionsFrom('METEOR@1.1.0.2');

  //REVIEWS
  api.addFiles(['templates/findOneReview.html'], 'client');
  api.addFiles(['templates/findReviews.html'], 'client');
  api.addFiles(['templates/insertReview.html'], 'client');
  api.addFiles(['templates/updateReview.html'], 'client');

  api.addFiles(['code/lib/reviewsCollection.js'], ['client', 'server']);
  api.addFiles(['code/server/reviewsSecurity.js'], 'server');

  api.addFiles(['templates/reviewTemplateCode.js'], 'client');


  api.export('Reviews');


});
