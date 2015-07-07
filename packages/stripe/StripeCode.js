/**
 * Created by macsj200 on 5/30/15.
 */



if (Meteor.isServer) {

    var updateCharge = function(event,res) {
        var existingCharge = Charges.findOne({chargeId: event.data.object.id});

        var targetUser = Meteor.users.findOne({_id: event.data.object.metadata.createdBy});

        if (existingCharge) {
            Charges.update({_id: existingCharge._id}, {$set: {stripeChargeObj: event.data.object}});

            res.writeHead(200);
            res.end('end');
        } else {
            Charges.insert({chargeId: event.data.object.id,
                stripeChargeObj: event.data.object,
                chargeTargetDocId: event.data.object.metadata.chargeTargetDocId,
                createdBy: event.data.object.metadata.createdBy},
                function() {

                  res.writeHead(200);
                  res.end('end');
                    // Meteor.users.update(event.data.object.metadata.createdBy, {
                    //     $set: {'clientCall.charge': !targetUser.clientCall.charge}
                    // });
            });
        }
    };

    Router.route('/api/stripe/connect/webhook', {where: 'server'}).post(function() {
        var event = this.request.body;

        console.log('Type: ', event.type);



        updateCharge(event, this.response);

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
