if (Meteor.isClient) {

  Template.postCreatorControls.onCreated(function() {

     var postId = Template.currentData().postId;

     this.subscribe('post', postId);
  });

  Template.postCreatorControls.helpers({
    currentPost: function() {
      var postId = Template.currentData().postId;
      return Posts.findOne({_id: postId});
    }
  });

  Template.postCreatorControls.events({
      'click #deletePostButton': function() {
          //'this' is the current doc we are showing
          Modal.show('confirmPostDeleteModal', this);
      }
  });

}
