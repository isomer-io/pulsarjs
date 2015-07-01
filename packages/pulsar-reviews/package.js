Package.describe({
  name: 'pulsar-reviews',
  version: '0.0.1',
  summary: '',
  documentation: ''
});

Package.onUse(function(api) {
  api.use(["templating",'tracker','session'], "client");

  api.use("meteorhacks:async@1.0.0", "server");

  api.use([
    "orionjs:core@1.1.0",
    "iron:router@1.0.9",
    "meteorhacks:async@1.0.0",
    "spacebars","ongoworks:security","nicolaslopezj:roles", 'alethes:pages'
  ], ["client", "server"]);

  api.versionsFrom('METEOR@1.1.0.2');

  //REVIEWS
  api.addFiles(['code/lib/reviewsCollection.js'], ['client', 'server']);
  api.addFiles(['code/server/reviewsSecurity.js'], 'server');

  api.addFiles(['templates/reviewTemplateCode.js'], 'client');
  api.addFiles(['templates/findOneReview.html'], 'client');
  api.addFiles(['templates/findReviews.html'], 'client');
  api.addFiles(['templates/insertReview.html'], 'client');
  api.addFiles(['templates/updateReview.html'], 'client');


  api.export('Reviews');


});