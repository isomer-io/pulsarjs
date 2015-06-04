/**
 * Created by wesley on 6/2/15.
 */

if (Meteor.isClient) {

    Navbar.add({
        url: '/posts',
        menuName: 'Posts',
        menuOrientation: 'left',
        pageTemplateName: 'postsPage'
    });

    Router.route('/posts/insert', function() {
       this.render('insertPostPage');
    });

    Router.route('/posts/:_id', function() {

        //we must subscribe to the post we are showing!!!
        this.subscribe('post', this.params._id);

        //now let's query that post
        var post = Posts.findOne({_id: this.params._id});

        //then set it as the 'this' object on the page
        this.render('singlePostPage', {data: post});
    });

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

    //Here we define a helper on the single post page
    Template.singlePostPage.helpers({
        'isOwner': function() {
            return this.createdBy === Meteor.userId();
        }
    });

    //This is how you display a modal
    //In this case, we are displaying a modal to
    //confirm that the user wants to delete a specific post
    Template.singlePostPage.events({
        'click #deletePostButton': function() {
            Modal.show('confirmPostDeleteModal', this);
        }
    });


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
    })

}

