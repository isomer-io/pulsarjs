/**
* Created by macsj200 on 5/30/15.
*/
if (Meteor.isServer) {

  var handleWebhook = function(event,res) {
    var webhookCallback = function(err){
      if(err){
        res.writeHead(300);
        res.end('err');
      } else {
        res.writeHead(200);
        res.end('ok');
      }
    };

    var definedWebhooks = {
      "charge.succeeded":function(){
        var existingCharge = Charges.findOne({chargeId: event.data.object.id});

        var targetUser = Meteor.users.findOne({_id: event.data.object.metadata.createdBy});

        if (existingCharge) {
          Charges.update({_id: existingCharge._id}, {$set: {stripeChargeObj: event.data.object}},webhookCallback);
        } else {
          Charges.insert({chargeId: event.data.object.id,
            stripeChargeObj: event.data.object,
            chargeTargetDocId: event.data.object.metadata.chargeTargetDocId,
            createdBy: event.data.object.metadata.createdBy},
            webhookCallback);
          }
        }
      }

      if(definedWebhooks[event.type]){
        definedWebhooks[event.type]();
      } else {
        res.writeHead(404);
        res.end('Hook not defined');
      }
    }

    Router.route('/api/stripe/connect/webhook', {where: 'server'}).post(function() {
      var event = this.request.body;


      handleWebhook(event, this.response);
    });
  }


  /**
  * Initializes the variables, so you can
  * edit them in the admin panel
  */

  orion.config.add('Stripe Secret Key', 'stripe', {secret: true});
  orion.config.add('Stripe Publishable Key', 'stripe', {public: true});

  orion.config.add('Stripe Client Id', 'stripe', {public: true});

  orion.config.add('Company Name', 'stripe', {public: true});
  orion.config.add('Stripe Application Fee (Cents)', 'stripe', {public: true});
