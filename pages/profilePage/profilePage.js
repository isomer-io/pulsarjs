/**
 * Created by wesley on 6/3/15.
 */

if (Meteor.isClient) {

    Navbar.add({
        url: '/profile',
        menuName: 'Account',
        menuOrientation: 'right',
        requiresLogin: true
    });

    Router.route('/profile', function() {

        if (!Meteor.user()) {
            return;
        }
        this.render('profilePage');

    });


}