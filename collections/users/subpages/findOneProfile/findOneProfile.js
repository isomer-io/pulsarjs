if (Meteor.isClient) {
  Template.findOneProfile.onCreated(function() {

    userId = Template.currentData().userId;

     this.subscribe('userProfile', userId);
  });

  Template.findOneProfile.helpers({
    currentProfile: function() {
      var user = Meteor.users.findOne({_id: userId});
      return user.profile;
    },
    currentProfilePictureUrl:function(){
      var user = Meteor.users.findOne({_id: userId});
      return user.profile.profilePictures[0].url;
    },
    age:function(){
      var user = Meteor.users.findOne({_id: userId});
      return Math.round((new Date() - user.profile.birthday) * 3.1709791983765E-11);
    }

  });

}
