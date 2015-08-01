if (Meteor.isClient) {
  Template.findOneProfile.onCreated(function() {

     var userId = Template.currentData().userId;

     this.subscribe('userProfile', userId);
  });

  Template.findOneProfile.helpers({
    currentProfile: function() {
      var userId = Template.currentData().userId;
      var user = Meteor.users.findOne({_id: userId});
      return user.profile;
    }
  });

}
