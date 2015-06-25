/**
 * Created by wesley on 6/4/15.
 */

/**
 * Define publications here
 */
//Meteor.publish('review', function(reviewId) {
//    return Posts.find({_id: reviewId});
//});

/**
 *
 * Define your security permissions here
 *
 */

////they can only insert if they are a user
//Reviews.permit('insert').ifLoggedIn().apply();
//
////can update if they are logged in and the document was created by them
//Reviews.permit('update').ifLoggedIn().ifCreatedByUser().apply();
//
////can update if they are an admin
//Reviews.permit('update').ifHasRole('admin').apply();
//
////can remove if they are logged in and the document was created by them
//Reviews.permit('remove').ifLoggedIn().ifCreatedByUser().apply();
//
////can remove if they are an admin
//Reviews.permit('remove').ifHasRole('admin').apply();