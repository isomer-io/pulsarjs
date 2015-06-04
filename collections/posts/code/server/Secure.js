/**
 * Created by wesley on 6/4/15.
 */

/**
 * Define publications here
 */
Meteor.publish('post', function(postId) {
    return Posts.find({_id: postId});
});