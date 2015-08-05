/**
 * Created by wesley on 6/2/15.
 */

LaunchBox = {
    collections: {}
};

var checkRestrictions = function(restrictions) {
  for (var i = 0; i < restrictions.length; i++) {

    var currentRestricition = resrtictions[i];

    var arg = currentRestriction.definition.arg;

    //call the rule TODO: 'make 'find' more generic'

    var userId;

    if (Meteor.isClient) {
      var userId = Meteor.userId();
    }
    if (Meteor.isServer) {
      var userId = this.userId;
    }

    if (currentRestriction.definition.deny('find', arg, Meteor.userId())) {
      return false;
    }
  }
  return true;
}

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

var getRulesByType = function(type, rules) {

  var results = [];

  for (var i = 0; i < rules.length; i++) {
    if (_.contains(rules[i].types, type)) {
      results.push(rules[i]);
    }
  }
  return results;
}

Security.Rule.prototype.apply = (function (original) {
  return function () {
    //do something additional

    var currentCollection = LaunchBox.collections[this._collections[0]._name];

    if (!currentCollection.rules) {
      currentCollection.rules = [];
    }


    var singularName = currentCollection.singularName;

    if (this._types[0] === 'findOne') {

      if (Meteor.isServer) {
        Meteor.publish('findOne' + singularName.charAt(0).toUpperCase() + singularName.slice(1), function(docId) {

          var rules = getRulesByType('findOne', rulesByCollection[currentCollection.pluralName]);

          for (var i = 0; i < rules.length; i++) {



            if (!checkRestrictions(rules[i].restrictions)) {
              this.ready();

              return [];
            }
          }

          //TODO: add in execpt props

          // return currentCollection.find({_id: docId})
          this.ready();
          return [];
        });
      }

      return;

    }

      if (this._types[0] === 'find') { //TODO: change to types.contains, may not need this anymore

        return;

    } else {
      original.apply(this);
    }
  }
})(Security.Rule.prototype.apply);


Router.configure({
    fastRender: true,
    layoutTemplate: 'appLayout'
});
