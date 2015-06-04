/**
 * Created by wesley on 6/2/15.
 */


orion.config.add('STRIPKEYONE', 'stripe');
orion.config.add('STRIPE KEY 2', 'stripe', {secret: true});

if (Meteor.isServer) {
    //CollectionHooks.defaults.before.all = {exampleOption: 1};

    //Security.defineMethod("ifCreatedByUser", {
    //    fetch: [],
    //    transform: null,
    //    deny: function (type, arg, userId, doc) {
    //        return userId !== doc.createdBy;
    //    }
    //});

}