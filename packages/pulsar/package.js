Package.describe({
  name: 'pulsar',
  version: '0.0.1',
  summary: '',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.use(["templating",'tracker','session'], "client");

  api.use("meteorhacks:async@1.0.0", "server");

  api.use([
    "mrgalaxy:stripe@2.1.0",
    "orionjs:core@1.1.0",
    "iron:router@1.0.9",
    "meteorhacks:async@1.0.0",
    "spacebars","ongoworks:security","nicolaslopezj:roles", "stripe", "orionjs:image-attribute"
  ], ["client", "server"]);

  api.versionsFrom('METEOR@1.1.0.2');


  //CUSTOM ROLES
  api.addFiles(['security/server/lib/nicholasroles.js'],'server');

  //REVIEWS
  api.addFiles(['reviews/code/lib/reviewsCollection.js'], ['client', 'server']);

  api.addFiles(['reviews/code/server/reviewsSecurity.js'], 'server');

  api.addFiles(['reviews/templates/findOneReview.html'], 'client');
  api.addFiles(['reviews/templates/findReviews.html'], 'client');
  api.addFiles(['reviews/templates/insertReview.html'], 'client');
  api.addFiles(['reviews/templates/updateReview.html'], 'client');
  api.addFiles(['reviews/templates/reviewTemplateCode.js'], 'client');







});