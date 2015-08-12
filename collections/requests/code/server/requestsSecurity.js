/**
 * Created by wesley on 6/4/15.
 */

/**
 * Define publications here
 */
Meteor.publish('request', function(requestId) {
    return Requests.find({_id: requestId});
});

/**
 *
 * Define your security permissions here
 *
 */

//they can only insert if they are a user
Requests.permit('insert').ifLoggedIn().apply();

//can update if they are logged in and the document was created by them
Requests.permit('update').ifLoggedIn().ifCreatedByUser().apply();

//can update if they are an admin
Requests.permit('update').ifHasRole('admin').apply();

//can remove if they are logged in and the document was created by them
Requests.permit('remove').ifLoggedIn().ifCreatedByUser().apply();

//can remove if they are an admin
Requests.permit('remove').ifHasRole('admin').apply();