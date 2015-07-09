if(Meteor.isServer){

    Meteor.publish("userStripeData", function () {
        if (this.userId) {
            return Meteor.users.find({_id: this.userId}, {fields: {"stripe":1, "stripeCustomerId": 1}});
        } else {
            this.ready();
        }
    });

    Meteor.methods({
        obtainAccessToken:function(query){
            if(query.error){
                return query.error;
            } else{
                if(!Meteor.users.findOne(Meteor.userId()).stripe){
                    var url = "https://connect.stripe.com/oauth/token?" + "code=" + query.code +"&client_secret=" + orion.config.get('STRIPE_API_SECRET') + "&grant_type=authorization_code";

                    var result = Meteor.http.call("POST", url);

                    Meteor.users.update({_id:Meteor.userId()}, {$set: {stripe: result.data} } );

                    if(result.data.stripe_user_id){
                        Roles.addUserToRoles(Meteor.userId(), 'vendor');
                    }

                    return result.data;
                } else {
                    console.log('User already has stripe profile');
                }
            }
        },
        chargeCard:function(token,item, itemCollectionName){
            var Stripe = StripeAPI(orion.config.get('STRIPE_API_SECRET'));

            var user = Meteor.users.findOne(Meteor.userId());

            var params = {
                amount: Math.round(item.price * 100),
                currency: 'usd',
                source: token.id,
                application_fee:orion.config.get('STRIPE_APPLICATION_FEE_CENTS'),
                destination: Meteor.users.findOne(item.createdBy).stripe.stripe_user_id,
                description: item.title,
                metadata: {
                    chargeTargetDocId: item._id,
                    createdBy: Meteor.userId(),
                    targetDocCollectionName: itemCollectionName
                }
            };


            var res = Async.runSync(function(done) {
                Stripe.charges.create(params, function (err, chargeObj) {
                    done(err, chargeObj);
                })
            });

            return res;
        },
        createSubscription:function(token,plan){

            var Stripe = StripeAPI(orion.config.get('STRIPE_API_SECRET'));

            var user = Meteor.users.findOne(Meteor.userId());

            var stripeCustomerId = user.stripeCustomerId;

            if(!stripeCustomerId) {
                var res = Async.runSync(function (done) {
                    Stripe.customers.create({
                        source: token.id,
                        email: Meteor.user().emails[0].address
                    }, function (err, customerObj) {

                        stripeCustomerId = customerObj.id;

                        done(err, stripeCustomerId);
                    })
                });

                Meteor.users.update({_id:Meteor.userId()}, {$set: {stripeCustomerId: stripeCustomerId} } );
            }

            var userSubscriptions = (function(){
              var Stripe = StripeAPI(orion.config.get('STRIPE_API_SECRET'));

              var user = Meteor.users.findOne(Meteor.userId());

              var userSubscriptions = null;

              //error handling
              if (!user.stripeCustomerId) {
                  return [];
              }

              var res = Async.runSync(function (done) {
                  Stripe.customers.retrieve(
                      user.stripeCustomerId,
                      function(err, customer) {
                          userSubscriptions = customer.subscriptions.data;

                          //TODO: make less hackish
                          _.forEach(userSubscriptions, function(subscription){
                              subscription.planId = subscription.plan.id;
                          });

                          done(err, customer);
                      }
                  );
              });

              return userSubscriptions;
            })();

            var res = Async.runSync(function (done) {
                if(userSubscriptions.length !== 0){
                  done({msg:'You can\'t subscribe to more than one plan at a time'});
                } else {
                  console.log('subscribing to plan',plan);
                  Stripe.customers.createSubscription(stripeCustomerId, {
                      plan: plan
                  },function(err,data){

                      if(!err){
                          console.log('subscribed');
                      }

                      done(err,data);
                  });
                }
            });

            return res;
        },
        getPlans:function(){
            var Stripe = StripeAPI(orion.config.get('STRIPE_API_SECRET'));

            var plans = null;

            var res = Async.runSync(function (done) {
                Stripe.plans.list(function (err, plansObj) {
                    plans = plansObj;

                    done(err, plans);
                })
            });

            return plans;
        },
        getUserSubscriptions:function(){
            var Stripe = StripeAPI(orion.config.get('STRIPE_API_SECRET'));

            var user = Meteor.users.findOne(Meteor.userId());

            var userSubscriptions = null;

            //error handling
            if (!user.stripeCustomerId) {
                return [];
            }

            var res = Async.runSync(function (done) {
                Stripe.customers.retrieve(
                    user.stripeCustomerId,
                    function(err, customer) {
                        userSubscriptions = customer.subscriptions.data;

                        //TODO: make less hackish
                        _.forEach(userSubscriptions, function(subscription){
                            subscription.planId = subscription.plan.id;
                        });

                        done(err, customer);
                    }
                );
            });

            return userSubscriptions;
        },
        cancelSubscription:function(subscriptionId){
            //TODO: read docs more closely https://stripe.com/docs/api/node#cancel_subscription

            console.log('cancelling plan');

            var Stripe = StripeAPI(orion.config.get('STRIPE_API_SECRET'));

            var user = Meteor.users.findOne(Meteor.userId());

            var userSubscriptions = null;

            var res = Async.runSync(function (done) {
                Stripe.customers.cancelSubscription(user.stripeCustomerId, subscriptionId, function(err, res) {
                    if(!err){
                        console.log('canceled');
                    }
                    done(err, res);
                });


            });

            return userSubscriptions;
        },
        itemHasMerchant:function(ownerId){
            var owner = Meteor.users.findOne(ownerId);


            if(owner && owner.stripe){
                if(owner.stripe.stripe_user_id){
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        },
        refund:function(chargeId){
            console.log('refunding');

            var Stripe = StripeAPI(orion.config.get('STRIPE_API_SECRET'));

            var user = Meteor.users.findOne(Meteor.userId());


            var res = Async.runSync(function (done) {
                Stripe.charges.createRefund(chargeId, function(err, res) {
                    done(err, res);
                });
            });

            return res;
        },
        getChargesForUser: function() {

        },
        chargeExistsForDocument: function(docId, collectionName) {
            var collection = LaunchBox.collections[collectionName];

            //warning, could return multiple documents
            var charges = Charges.find({chargeTargetDocId: docId}).fetch();

            for (var i = 0; i < charges.length; i++) {
                if (charges[i].stripeChargeObj.metadata.targetDocCollectionName === collectionName) {
                    return true;
                }
            }

            return false;

        },
        getBuyer: function(docId, collectionName) {
            return Charges.findOne({chargeTargetDocId: docId}).metadata.createdBy;


        }
    });

}
