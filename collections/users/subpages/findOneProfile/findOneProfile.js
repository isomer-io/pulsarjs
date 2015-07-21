if (Meteor.isClient) {
  Template.findOneProfile.onCreated(function() {

     var userId = Template.currentData().userId;

     this.subscribe('userProfile', userId);
  });

  Template.findOneProfile.helpers({
    currentProfile: function() {
      var userId = Template.currentData().userId;
      return Meteor.users.findOne({_id: userId}).profile;
    }
  });

}
