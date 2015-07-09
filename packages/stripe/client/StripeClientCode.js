if(Meteor.isClient){
    var subscriptionsDep = null;

    Meteor.startup(function(){
        subscriptionsDep = new Deps.Dependency();

        Session.setDefault('plans',[]);

        Stripe.setPublishableKey(orion.config.get('STRIPE_API_KEY'));

        chargeHandler = StripeCheckout.configure({
            key: orion.config.get('STRIPE_API_KEY'),
            token: function(token) {
                Meteor.call('chargeCard', token, Session.get('currentItem'), Session.get('currentItem.targetDocCollectionName'),function(err,data){
                    Session.set('stripeChargeErr',err);
                    Session.set('stripeChargeData',data.result);
                });
            }
        });

        subscriptionHandler = StripeCheckout.configure({
            key: orion.config.get('STRIPE_API_KEY'),
            token: function(token) {
                Meteor.call('createSubscription', token, Session.get('currentPlan'), function(err,data){
                    Session.set('stripeSubscriptionErr',data.error);
                    Session.set('stripeSubscriptionData',data.result);
                    subscriptionsDep.changed();
                });
            }
        });
    });

    Meteor.subscribe("userStripeData");









    Template.subscribe.helpers({
        stripeSubscriptionData:function(){
            return Session.get('stripeSubscriptionData');
        },
        stripeUnsubscritptionData:function(){
          return Session.get('stripeUnsubscriptionData');
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
        },
        userHasSubscription:function(){
          return false || Session.get('userSubscriptions').length !== 0;
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








}
