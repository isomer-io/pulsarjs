/**
 * Created by wesley on 6/4/15.
 */

/**
 * Define publications here
 */
Meteor.publish('post', function(postId) {
    return Posts.find({_id: postId});
});

/**
 *
 * Define your security permissions here
 *
 */

//they can only insert if they are a user
Posts.permit('insert').ifLoggedIn().apply();

//can update if they are logged in and the document was created by them
Posts.permit('update').ifLoggedIn().ifCreatedByUser().apply();

//can update if they are an admin
Posts.permit('update').ifHasRole('admin').apply();

//can remove if they are logged in and the document was created by them
Posts.permit('remove').ifLoggedIn().ifCreatedByUser().apply();

//can remove if they are an admin
Posts.permit('remove').ifHasRole('admin').apply();