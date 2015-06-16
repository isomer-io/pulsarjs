if(Meteor.isClient){
    var copyArray = function(arr){
        var copyOfArr = [];

        for(var i = 0; i < arr.length; i++){
            copyOfArr.push(arr[i]);
        }

        return copyOfArr;
    };

    Meteor.startup(function(){
        Session.setDefault('cart',[]);

        Stripe.setPublishableKey(orion.config.get('STRIPE_API_KEY'));

        handler = StripeCheckout.configure({
            key: orion.config.get('STRIPE_API_KEY'),
            token: function(token) {
                Meteor.call('chargeCard', token, Session.get('currentItem'),function(err,data){
                    Session.set('stripeChargeErr',err);
                    Session.set('stripeChargeData',data.result);
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

    Template.connectToStripeButtonTemplate.helpers({
        stripeClientId:function(){
            return orion.config.get('STRIPE_API_CLIENT_ID');
        }
    });

    Template.payForItemButtonTemplate.events({
        'click #payForItemButton':function(event){
            Session.set('currentItem', this);
            handler.open({
                name: orion.config.get('STRIPE_COMPANY_NAME'),
                description: this.name,
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