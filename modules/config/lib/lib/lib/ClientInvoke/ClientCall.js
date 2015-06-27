/**
 * Created by wesley on 6/26/15.
 */

if (Meteor.isServer) {

    Meteor.publish("userClientCall", function () {
        if (this.userId) {
            return Meteor.users.find({_id: this.userId}, {fields: {"clientCall":1}});
        } else {
            this.ready();
        }
    });

}

if (Meteor.isClient) {

    Meteor.subscribe('userClientCall');

    Tracker.autorun(function() {
        if (Meteor.user().clientCall && Meteor.user().clientCall.charge.created) {
            Session.set('clientCall.charge.created', Session.get('clientCall.charge.created'));
        }
    });

}