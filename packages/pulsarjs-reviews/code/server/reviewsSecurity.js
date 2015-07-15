/**
 * Created by wesley on 6/4/15.
 */

/**
 * Define publications here
 */
Meteor.publish('review', function(reviewId) {
    return Posts.find({_id: reviewId});
});

/**
 *
 * Define your security permissions here
 *
 */

//TODO: make these reflect UI permission

//they can only insert if they are a user
Reviews.permit('insert').ifLoggedIn().apply();

//can update if they are logged in and the document was created by them
Reviews.permit('update').ifLoggedIn().ifCreatedByUser().apply();

//can update if they are an admin
Reviews.permit('update').ifHasRole('admin').apply();

//can remove if they are logged in and the document was created by them
Reviews.permit('remove').ifLoggedIn().ifCreatedByUser().apply();

//can remove if they are an admin
Reviews.permit('remove').ifHasRole('admin').apply();

Meteor.methods({
    averageStars: function(reviewedDocId) {
        var results = Reviews.aggregate(
            [
                { $match : {reviewDocument: reviewedDocId} },
                {
                    $group:
                    {
                        _id: null,
                        avgStars: { $avg: "$numberOfStars" }
                    }
                }
            ]
        );
        if (results.length === 0) {
            return 0;
        } else {
            return results[0].avgStars;
        }
    },
    canReviewDocument: function(docToReview, collectionName) {

        //check if they have written a review already
        var results = Reviews.find({createdBy: Meteor.userId(), reviewDocument: docToReview._id}).fetch();

        if (results.length > 0) {
            return false;
        } else {
            //check if the collection allows it
            var reviewSettings = LaunchBox.collections[collectionName].reviewSettings;

            if (reviewSettings) {
                //check if creator is allowed to review
                if (Meteor.userId() === docToReview.createdBy) {
                    return reviewSettings.transactionReviewMode;
                }

                //check if they must buy
                if (reviewSettings.mustPurchaseToReview) {
                    //check if they have bought it, if true can review
                    return Meteor.call('chargeExistsForDocument', docToReview._id, collectionName);
                } else {
                    return true;
                }

            }

            return false;
        }
    }
});
