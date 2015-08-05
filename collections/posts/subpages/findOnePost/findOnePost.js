if (Meteor.isClient) {
  Template.findOnePost.onCreated(function() {

     var postId = Template.currentData().postId;

     //subscribe
     Meteor.subscribe('findOnePost', postId);
  });

  Template.findOnePost.helpers({
    currentPost: function() {
      var postId = Template.currentData().postId;
      return Posts.findOne({_id: postId});
    }
  });

}
