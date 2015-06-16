/**
 * Created by macsj200 on 5/30/15.
 */

Router.route('/api/stripeoauth/').get(function () {
    if(!Meteor.user().stripe){
        Meteor.call('obtainAccessToken', this.params.query, function(err,data){

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
orion.config.add('STRIPE_API_KEY', 'stripe');
orion.config.add('STRIPE_API_CLIENT_ID', 'stripe');
orion.config.add('STRIPE_API_SECRET', 'stripe', {secret: true});
orion.config.add('STRIPE_COMPANY_NAME', 'stripe', {secret: true});
orion.config.add('STRIPE_COMMISSION', 'stripe');