/**
 * Created by wesley on 6/4/15.
 */

/**
 * Define publications here
 */
Meteor.publish('job', function(jobId) {
    return Jobs.find({_id: jobId});
});

/**
 *
 * Define your security permissions here
 *
 */

//they can only insert if they are a user
Jobs.permit('insert').ifLoggedIn().apply();

//can update if they are logged in and the document was created by them
Jobs.permit('update').ifLoggedIn().ifCreatedByUser().apply();

//can update if they are an admin
Jobs.permit('update').ifHasRole('admin').apply();

//can remove if they are logged in and the document was created by them
Jobs.permit('remove').ifLoggedIn().ifCreatedByUser().apply();

//can remove if they are an admin
Jobs.permit('remove').ifHasRole('admin').apply();