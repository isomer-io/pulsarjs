/**
 * Created by wesley on 6/29/15.
 */

Router.route('/api/oauth/stripe/').get(function () {
    if(!Meteor.user().stripe){
        Meteor.call('obtainAccessToken', this.params.query, function(err,data){
            Session.set('stripeOauthErr',err);
            Session.set('stripeOauthData',data);
        });
    }
    this.render('StripeOauthPage');
});

Template.buyerSetupButton.helpers({
    stripeClientId:function(){
        return orion.config.get('STRIPE_API_CLIENT_ID');
    }
});

Template.stripeOauthTemplate.helpers({
    stripeData:function(){
        return Session.get('stripeOauthData');
    },
    stripeErr:function(){
        return Session.get('stripeOauthErr');
    }
});