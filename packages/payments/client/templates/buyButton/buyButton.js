/**
 * Created by wesley on 6/29/15.
 */

Template.buyButton.helpers();

Template.buyButton.onRendered(function() {
    var self = this;

    canBuyDocument(self.data);

    Tracker.autorun(function() {

        if (Meteor.user() && Meteor.user().clientCall && Meteor.user().clientCall.charge) {
            canBuyDocument(self.data);
        }
    });
});

Template.buyButton.helpers({
    stripeClientId:function(){
        return orion.config.get('STRIPE_API_CLIENT_ID');
    },
    itemHasMerchant:function(){
        Meteor.call('itemHasMerchant', this.createdBy, function(err,res){
            Session.set('itemHasMerchant', res);
        });

        return Session.get('itemHasMerchant');
    },
    stripeData:function(){
        return Session.get('stripeChargeData');
    },
    stripeErr:function(){
        return Session.get('stripeChargeErr');
    },
    canBuy: function() {
        return Session.get('charge.canPayForItem') && !this.isCreator();
    },
    isSeller: function() {
        return this.isCreator();
    }
});

Session.setDefault('charge.canPayForItem', true);
var canBuyDocument = function(doc) {

    if (doc.createdBy === Meteor.userId()) {
        return false;
    }

    Meteor.call('chargeExistsForDocument', doc._id, doc.getCollectionName(), function(err, res) {

        if (LaunchBox.collections[doc.getCollectionName()].chargeSettings.sellOnce) {
            Session.set('charge.canPayForItem', !res);
        }

    });
};

Template.buyButton.events({
    'click #payForItemButton':function(event){
        Session.set('currentItem', this);
        Session.set('currentItem.targetDocCollectionName', this.getCollectionName());
        chargeHandler.open({
            name: orion.config.get('STRIPE_COMPANY_NAME'),
            description: this.title,
            email:Meteor.user().emails[0].address,
            amount: Math.round(this.price * 100)
        });
    }
});