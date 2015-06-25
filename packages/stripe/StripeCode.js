/**
 * Created by macsj200 on 5/30/15.
 */

Router.route('/api/oauth/stripe/').get(function () {
    if(!Meteor.user().stripe){
        Meteor.call('obtainAccessToken', this.params.query, function(err,data){
            console.log(this.params);

            Session.set('stripeOauthErr',err);
            Session.set('stripeOauthData',data);
        });
    }
    this.render('StripeOauthPage');
});

/**
 * Initializes the variables, so you can
 * edit them in the admin panel
 */
orion.config.add('STRIPE_API_KEY', 'stripe', {public: true});
orion.config.add('STRIPE_API_CLIENT_ID', 'stripe', {public: true});
orion.config.add('STRIPE_API_SECRET', 'stripe', {secret: true});
orion.config.add('STRIPE_COMPANY_NAME', 'stripe');
orion.config.add('STRIPE_APPLICATION_FEE_CENTS', 'stripe', {public: true});

if (Meteor.isServer) {
    //allowEnv({
    //    STRIPE_API_SECRET: 0
    //});

}
