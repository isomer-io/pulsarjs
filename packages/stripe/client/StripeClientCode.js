if(Meteor.isClient){
    var subscriptionsDep = null;

    Meteor.startup(function(){
        subscriptionsDep = new Deps.Dependency();

        Session.setDefault('plans',[]);

        Stripe.setPublishableKey(orion.config.get('STRIPE_API_KEY'));

        chargeHandler = StripeCheckout.configure({
            key: orion.config.get('STRIPE_API_KEY'),
            token: function(token) {
                Meteor.call('chargeCard', token, Session.get('currentItem'),function(err,data){
                    Session.set('stripeChargeErr',err);
                    Session.set('stripeChargeData',data.result);
                });
            }
        });

        subscriptionHandler = StripeCheckout.configure({
            key: orion.config.get('STRIPE_API_KEY'),
            token: function(token) {
                Meteor.call('createSubscription', token, Session.get('currentPlan'), function(err,data){
                    Session.set('stripeSubscriptionErr',err);
                    Session.set('stripeSubscriptionData',data.result);
                    subscriptionsDep.changed();
                });
            }
        });
    });

    Meteor.subscribe("userTransactions");

    Template.stripeOauthTemplate.helpers({
        stripeData:function(){
            return Session.get('stripeOauthData');
        },
        stripeErr:function(){
            return Session.get('stripeOauthErr');
        }
    });

    Template.payForItem.helpers({
        stripeData:function(){
            return Session.get('stripeChargeData');
        },
        stripeErr:function(){
            return Session.get('stripeChargeErr');
        }
    });

    Template.subscribe.helpers({
        stripeData:function(){
            return Session.get('stripeSubscriptionData');
        },
        stripeErr:function(){
            return Session.get('stripeSubscriptionErr');
        },
        plans:function(){
            //TODO: should we be reactively (repeatedly) using RMI here?
            Meteor.call('getPlans', function(err,res){
                Session.set('plans',res.data);
            });

            return Session.get('plans');
        }
    });

    Template.subscribe.helpers({
        userIsSubscribed:function(planId){
            subscriptionsDep.depend();
            Meteor.call('getUserSubscriptions', function(err,res){
                Session.set('userSubscriptions', res);
            });

            //TODO: possibly clean up (a little hackish injecting planId, need to do for findWhere to work)
            return _.findWhere(Session.get('userSubscriptions'), {'planId':planId});
        }
    });

    Template.subscribeButtonTemplate.events({
        'click #subscribeButton':function(event){
            Session.set('currentPlan',this.id);
            subscriptionHandler.open({
                name: orion.config.get('STRIPE_COMPANY_NAME'),
                description: 'Subscription', //TODO: this is also fucked
                email:Meteor.user().emails[0].address
            });
        }
    });

    Template.unsubscribeButtonTemplate.events({
        'click #unsubscribeButton':function(event){
            Meteor.call('getUserSubscriptions', function(err,res){
                Session.set('userSubscriptions', res);
            });


            Meteor.call('cancelSubscription', _.findWhere(Session.get('userSubscriptions'), {'planId':this.id}).id, function(err,res){
                subscriptionsDep.changed();
            });
        }
    });

    Template.connectToStripeButtonTemplate.helpers({
        stripeClientId:function(){
            return orion.config.get('STRIPE_API_CLIENT_ID');
        }
    });

    Template.payForItemButtonTemplate.events({
        'click #payForItemButton':function(event){
            Session.set('currentItem', this);
            chargeHandler.open({
                name: orion.config.get('STRIPE_COMPANY_NAME'),
                description: this.title,
                email:Meteor.user().emails[0].address,
                amount: Math.round(this.price * 100)
            });
        }
    });

    Template.payForItem.helpers({
        stripeClientId:function(){
            return orion.config.get('STRIPE_API_CLIENT_ID');
        },
        itemHasMerchant:function(){
            Meteor.call('itemHasMerchant', this.createdBy, function(err,res){
                Session.set('itemHasMerchant', res);
            });

            return Session.get('itemHasMerchant');
        }
    });

    Template.payForItemButtonTemplate.helpers({
        stripeData:function(){
            return Session.get('stripeChargeData');
        },
        stripeErr:function(){
            return Session.get('stripeChargeErr');
        }
    });

    Template.transaction.events({
        'click .refundButton':function(){
            Meteor.call('requestRefund', this.id, function(err,res){

            });
        }
    });

    Template.transactions.helpers({
        transactions:function(){
            return Meteor.user().transactions;
        }
    });
}