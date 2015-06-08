/**
 * Created by wesley on 6/8/15.
 */

if (Meteor.isClient) {

    /*
     After they click the confirm delete button,
     we remove the post document, hide the modal,
     and re-direct them to the list of posts
     */
    Template.confirmPostDeleteModal.events({
        'click #confirmDelete': function() {
            Posts.remove(this._id, function() {
                Modal.hide();
                Router.go('/posts');
            });
        }
    });

}