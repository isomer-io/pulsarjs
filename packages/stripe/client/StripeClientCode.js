if(Meteor.isClient){
    Meteor.startup(function(){
        Stripe.setPublishableKey(orion.config.get('STRIPE_API_KEY'));

        handler = StripeCheckout.configure({
            key: orion.config.get('STRIPE_API_KEY'),
            image: '/img/documentation/checkout/marketplace.png',
            token: function(token) {
                Meteor.call('chargeCard', token, Session.get('currentItem'),function(err,data){
                    console.log(err,data);
                    Session.set('stripeErr',err);
                    Session.set('stripeData',data.result);
                });
            }
        });
    });

    Meteor.subscribe("userData");

    Template.stripeOauthTemplate.helpers({
        stripeData:function(){
            return Session.get('stripeData');
        },
        stripeErr:function(){
            return Session.get('stripeErr');
        }
    });

    Template.payForItem.helpers({
        stripeData:function(){
            return Session.get('stripeData');
        },
        stripeErr:function(){
            return Session.get('stripeErr');
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
            handler.open({
                name: 'Demo Site',
                description: this.name,
                amount: Math.round(this.price * 100)
            });
        }
    });

    Template.payForItemButtonTemplate.helpers({
        stripeData:function(){
            return Session.get('stripeData');
        },
        stripeErr:function(){
            return Session.get('stripeErr');
        }
    });
}