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
        var existingCharge = Charges.findOne({chargeId: event.data.objec.id});

        if (existingCharge) {
            Charges.update({_id: existingCharge._id}, {$set: {stripeChargeObj: event.data.object}});
        } else {
            Charges.insert({chargeId: event.data.object.id, stripeChargeObj: event.data.object});
        }
    };

    Router.route('/api/stripe/connect/webhook', {where: 'server'}).post(function() {
        var event = this.request.body;

        this.response.end();


        console.log('Type: ', event.type);


        if (event.type === 'charge.succeeded') {
            //refresh charges on that user

            //console.log(typeof event.data.object);

            updateCharge(event);


            //Charges.upsert({chargeId: event.data.object.id}, {$set: {stripeChargeObj: event.data.object},
            //        $setOnInsert: {stripeChargeObj: event.data.object}});

        }

        if (event.type === 'charge.refunded') {

            updateCharge(event);

            //Charges.upsert({chargeId: event.data.object.id}, {$set: {stripeChargeObj: event.data.object}});

            //refresh charges on that user
            //var Stripe = StripeAPI(orion.config.get('STRIPE_API_SECRET'));

                //Stripe.charges.retrieve(event.data.object.id, function (err, res) {
                //
                //
                //    console.log(res.result);
                //
                //    Meteor.users.update(
                //        {_id: event.data.object.metadata.chargeCreatorId, "transactions.id": event.data.object.id},
                //        {$set: {"transactions.$": res.result}});
                //
                //    //done(err, res);
                //});


            //var res = Async.runSync(function (done) {
            //    Stripe.charges.retrieve(event.data.object.id, function (err, res) {
            //
            //        Meteor.users.update(
            //            {_id: event.data.object.metadata.chargeCreatorId, "transactions.id": event.data.object.id},
            //            {$set: {"transactions.$": res.result}});
            //
            //        done(err, res);
            //    });
            //});

            //TODO: this is quite fucked, but don't touch it because it's all we've got
            //    Meteor.call('updateCharge', event.data.object.id,
            //        Meteor.bindEnvironment(function(err, res) {
            //            //console.log(res);
            //        })
            //    );


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
