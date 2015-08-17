/**
 * Created by Sam on 8/17/2015.
 */

if (Meteor.isClient){
    Navbar.add({
        url: '/hire',
        menuName: 'Hire',
        menuOrientation: 'left'
    });

    Router.route('/hire', function() {
        this.render('hirePage');
    });
}