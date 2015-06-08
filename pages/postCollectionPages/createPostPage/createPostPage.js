/**
 * Created by wesley on 6/8/15.
 */

if (Meteor.isClient) {

    Router.route('/posts/insert', function() {
        this.render('insertPostPage');
    });

}