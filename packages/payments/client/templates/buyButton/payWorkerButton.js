/**
 * Created by wesley on 6/29/15.
 */

Template.payWorkerButton.onRendered(function() {
    var self = this;

    canBuyDocument(self.data);

    Tracker.autorun(function() {
        if (Meteor.user() && Meteor.user().clientCall && Meteor.user().clientCall.charge) {
            canBuyDocument(self.data);
        }
    });
});

Template.payWorkerButton.helpers({
    stripeClientId:function(){
        return orion.config.get('Stripe Client Id');
    },
    takerHasMerchant:function(){
        Meteor.call('takerHasMerchant', this.takenBy, function(err,res){
            Session.set('takerHasMerchant', res);
        });

        return Session.get('takerHasMerchant');
    },
    stripeData:function(){
        return Session.get('stripeChargeData');
    },
    stripeErr:function(){
        return Session.get('stripeChargeErr');
    },
    canBuy: function() {
        return Session.get('charge.canPayForItem');
    },
    isSeller: function() {
        return this.isCreator();
    }
});

Session.setDefault('charge.canPayForItem', true);

var canBuyDocument = function(doc) {
    // if (doc.createdBy === Meteor.userId()) {
    //     return false;
    // }

    // Meteor.call('chargeExistsForDocument', doc._id, doc.getCollectionName(), function(err, res) {
    //     if (LaunchBox.collections[doc.getCollectionName()].chargeSettings.sellOnce) {
    //         Session.set('charge.canPayForItem', !res);
    //     }
    // });
};

Template.payWorkerButton.events({
    'click #payForItemButton':function(event){
        Session.set('currentItem', this);
        Session.set('currentItem.targetDocCollectionName', this.getCollectionName());
        takerChargeHandler.open({
            name: orion.config.get('Company Name'),
            description: this.title,
            email:Meteor.user().emails[0].address,
            amount: Math.round(this.price * 100)
        });
    }
});
