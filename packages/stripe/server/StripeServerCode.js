if(Meteor.isServer){
    Meteor.publish("userTransactions", function () {
        if (this.userId) {
            return Meteor.users.find({_id: this.userId}, {fields: {"transactions": 1, "stripe":1}});
        } else {
            this.ready();
        }
    });

    Meteor.methods({
        obtainAccessToken:function(query){
            if(query.error){
                console.log(query.error);
                return query.error;
            } else{
                if(!Meteor.users.findOne(this.userId).stripe){
                    var url = "https://connect.stripe.com/oauth/token?" + "code=" + query.code +"&client_secret=" + orion.config.get('STRIPE_API_SECRET') + "&grant_type=authorization_code";

                    var result = Meteor.http.call("POST", url);

                    Meteor.users.update({_id:this.userId}, {$set: {stripe: result.data} } );

                    if(result.data.stripe_user_id){
                        Roles.addUserToRoles(this.userId, 'vendor');
                    }

                    return result.data;
                } else {
                    console.log('User already has stripe profile');
                }
            }
        },
        chargeCard:function(token,item){
            var Stripe = StripeAPI(orion.config.get('STRIPE_API_SECRET'));

            var user = Meteor.users.findOne(this.userId);

            var charge = null;

            var res = Async.runSync(function(done) {
                Stripe.charges.create({
                    amount: Math.round(item.price * 100),
                    currency: 'usd',
                    source: token.id,
                    application_fee:orion.config.get('STRIPE_APPLICATION_FEE_CENTS'),
                    destination: Meteor.users.findOne(item.createdBy).stripe.stripe_user_id,
                    description: item.title //TODO: this is fucked
                }, function (err, chargeObj) {
                    console.log(err,chargeObj);

                    charge = chargeObj;

                    done(err, chargeObj);
                })
            });

            if(!user.transactions){
                user.transactions = [];
                Meteor.users.update({_id:this.userId}, {$set: {transactions: user.transactions} } );
            }

            Meteor.users.update({_id:this.userId}, {$push: {transactions: charge} } );

            console.log(Meteor.users.findOne(this.userId).transactions);

            return res;
        },
        createSubscription:function(token,plan){
            var Stripe = StripeAPI(orion.config.get('STRIPE_API_SECRET'));

            var user = Meteor.users.findOne(this.userId);

            var stripeCustomerId = user.stripeCustomerId;

            if(!stripeCustomerId) {
                var res = Async.runSync(function (done) {
                    Stripe.customers.create({
                        source: token.id,
                        email: Meteor.user().emails[0].address
                    }, function (err, customerObj) {
                        console.log(err,customerObj);

                        stripeCustomerId = customerObj.id;

                        done(err, stripeCustomerId);
                    })
                });

                Meteor.users.update({_id:this.userId}, {$set: {stripeCustomerId: stripeCustomerId} } );
            }

            var res = Async.runSync(function (done) {
                console.log('subscribing to plan',plan);
                Stripe.customers.createSubscription(stripeCustomerId, {
                    plan: plan
                },function(err,data){

                    if(!err){
                        console.log('subscribed');
                    }

                    done(err,data);
                });
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

            var user = Meteor.users.findOne(this.userId);

            var userSubscriptions = null;

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

            var user = Meteor.users.findOne(this.userId);

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
        }
    });

}