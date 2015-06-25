/**
 * Created by wesley on 6/2/15.
 */


orion.collections.onCreated(function() {
    var self = this;

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
        //    return Roles.userHasPermission(Meteor.userId(), 'collections.' + self.name + '.index');
        //},
        //this.canShowCreate = function() {
        //    return Roles.userHasPermission(Meteor.userId(), 'collections.' + self.name + '.showCreate');
        //},
        this.helpers({
            getCollectionName: function() {
                return self.name;
            }
        });
    //}
});