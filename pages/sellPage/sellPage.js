/**
 * Created by Sam on 8/18/2015.
 */
if (Meteor.isClient){
    Router.route('sellPage', {
        path: '/sell'
    });
    Navbar.add({
        url: '/sell',
        menuName: 'Sell',
        menuOrientation: 'left'
    });
}
