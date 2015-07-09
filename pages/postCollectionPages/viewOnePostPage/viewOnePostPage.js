/**
 * Created by wesley on 6/8/15.
 */

if (Meteor.isClient) {

    Router.route('/posts/:_id', function() {

        //we must subscribe to the post we are showing!!!
        this.subscribe('post', this.params._id);

        //now let's query that post
        var post = Posts.findOne({_id: this.params._id});

        //then set it as the 'this' object on the page, using the data object
        this.render('viewOnePostPage', {data: post});
    });

    //This is how you display a modal
    //In this case, we are displaying a modal to
    //confirm that the user wants to delete a specific post
    Template.viewOnePostPage.events({
        'click #deletePostButton': function() {

            //'this' is the current doc we are showing
            Modal.show('confirmPostDeleteModal', this);
        }
    });

}
