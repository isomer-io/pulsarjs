/**
 * Created by wesley on 6/8/15.
 */

if (Meteor.isClient) {

    Router.route('/login/user', function() {
        this.render('logInPage');
    });

    //use this to configure login page

}
