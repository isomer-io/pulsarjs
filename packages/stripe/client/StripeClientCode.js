if(Meteor.isClient){

    Meteor.startup(function(){
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
                Meteor.call('createSubscription', token, function(err,data){
                    Session.set('stripeSubscriptionErr',err);
                    Session.set('stripeSubscriptionData',data.result);
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

    Template.subscribeButtonTemplate.events({
        'click #subscribeButton':function(event){
            console.log(this.id);
            subscriptionHandler.open({
                name: orion.config.get('STRIPE_COMPANY_NAME'),
                description: 'Subscription', //TODO: this is also fucked
                email:Meteor.user().emails[0].address
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

    Template.payForItemButtonTemplate.helpers({
        stripeData:function(){
            return Session.get('stripeChargeData');
        },
        stripeErr:function(){
            return Session.get('stripeChargeErr');
        }
    });
}