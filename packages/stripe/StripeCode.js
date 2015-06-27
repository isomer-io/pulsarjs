/**
 * Created by macsj200 on 5/30/15.
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

if (Meteor.isServer) {

    var updateCharge = function(event) {
        var existingCharge = Charges.findOne({chargeId: event.data.object.id});

        if (existingCharge) {
            Charges.update({_id: existingCharge._id}, {$set: {stripeChargeObj: event.data.object}});
        } else {
            Charges.insert({chargeId: event.data.object.id,
                stripeChargeObj: event.data.object,
                chargeTargetDocId: event.data.object.metadata.chargeTargetDocId,
                createdBy: event.data.object.metadata.createdBy},
                function() {
                    Meteor.users.update(Meteor.userId(), {
                        $set: {clientCall: 'charge.created'}
                    });
            });


        }
    };

    Router.route('/api/stripe/connect/webhook', {where: 'server'}).post(function() {
        var event = this.request.body;

        this.response.end();


        console.log('Type: ', event.type);


        if (event.type === 'charge.succeeded') {
            //refresh charges on that user

            updateCharge(event);

        }

        if (event.type === 'charge.refunded') {

            updateCharge(event);

        }

    });
}


/**
 * Initializes the variables, so you can
 * edit them in the admin panel
 */
orion.config.add('STRIPE_API_KEY', 'stripe', {public: true});
orion.config.add('STRIPE_API_CLIENT_ID', 'stripe', {public: true});
orion.config.add('STRIPE_API_SECRET', 'stripe', {secret: true});
orion.config.add('STRIPE_COMPANY_NAME', 'stripe', {public: true});
orion.config.add('STRIPE_APPLICATION_FEE_CENTS', 'stripe', {public: true});
