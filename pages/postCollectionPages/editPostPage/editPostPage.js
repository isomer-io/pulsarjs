/**
 * Created by wesley on 6/8/15.
 */

if (Meteor.isClient) {


    Router.route('/posts/:_id/edit', function() {

        //we must subscribe to the post we are showing!!!
        this.subscribe('post', this.params._id);

        //now let's query that post
        var post = Posts.findOne({_id: this.params._id});

        //then set it as the 'this' object on the page
        this.render('updatePostPage', {data: post});
    });

    //after they insert a new post, redirect back to
    //list of posts

    //'insertPost' is the id of the quickform we
    //and 'updatePost' are the id's of the quickforms
    //we want to listen to
    AutoForm.addHooks(['insertPost', 'updatePost'], {

        //the onSuccess method gets called after
        //a successful submit on either of the forms
        onSuccess: function(formType, result) {

            //this.docId is the _id of the document
            //the form just changed, so we will
            //load the url of that item and show the user
            //the result
            Router.go('/posts/' + this.docId);
        }
    });

}