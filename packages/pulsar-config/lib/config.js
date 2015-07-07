/**
 * Created by wesley on 6/2/15.
 */

LaunchBox = {
    collections: {}
};

orion.collections.onCreated(function() {
    var self = this;

    LaunchBox.collections[this.name] = this;

    /**
     * Collection permissions
     */
    //Roles.registerAction('collections.' + this.name + '.index', true);
    //Roles.registerAction('collections.' + this.name + '.showCreate', true);
    //Roles.registerAction('collections.' + this.name + '.showUpdate', true);
    //Roles.registerAction('collections.' + this.name + '.showRemove', true);
    //Roles.registerHelper('collections.' + this.name + '.indexFilter', {});
    //
    //this.attachRoles('collections.' + this.name);

    //if (Meteor.isClient) {
        //this.canIndex = function() {
          //  return Roles.userHasPermission(Meteor.userId(), 'collections.' + self.name + '.index');
        //},
        //this.canShowCreate = function() {
        //    return Roles.userHasPermission(Meteor.userId(), 'collections.' + self.name + '.showCreate');
        //},
        this.helpers({
            getCollectionName: function() {
                return self.name;
            },
            isCreator: function() {
                if (this.createdBy) {
                    return Meteor.userId() === this.createdBy;
                } else {
                    return false;
                }
            }
        });
    //}
});


Router.configure({
    fastRender: true,
    layoutTemplate: 'appLayout'
});
