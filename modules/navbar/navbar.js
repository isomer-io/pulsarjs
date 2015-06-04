/**
 * Created by wesley on 6/2/15.
 */


orion.dictionary.addDefinition('title', 'navbar', {
    type: String,
    label: 'Nav Bar Title'
});

if (Meteor.isClient) {


    //Navbar = {
    //    leftItems: [],
    //    rightItems: [],
    //    addLink: function(item) {
    //
    //        if (item.alignment === 'left') {
    //            leftItems.push(item);
    //        } else {
    //            rightItems.push(item);
    //        }
    //
    //        items.push(item);
    //    }
    //};

    //var blah = {
    //    url: '/whatever',
    //    subscribes: function() {
    //        //call subscriptions here
    //    },
    //    menuName: 'Whatever',
    //    menuOrientation: 'left || right',
    //    templateName: 'homePage'
    //};

    Router.route('/', function() {
        this.render('homePage');
    });

    Router.route('/signup', function() {
        this.render('loginPage');
    });

    Session.setDefault('pagesLeft', '[]');
    Session.set('pagesLeft', '[]');

    Session.setDefault('pagesRight', '[]');
    Session.set('pagesRight', '[]');

    Navbar = {

        add: function(item) {

            Router.route(item.url, function() {
               this.render(item.pageTemplateName);
            });

            if (item.menuOrientation === 'left') {

                var leftItems = JSON.parse(Session.get('pagesLeft'));

                leftItems.push(item);

                Session.set('pagesLeft', JSON.stringify(leftItems));
            } else {
                var rightItems = JSON.parse(Session.get('pagesRight'));

                rightItems.push(item);

                Session.set('pagesRight', JSON.stringify(rightItems));
            }
        }

    };

    Template.navbar.helpers({
       pagesLeft: function() {
           return JSON.parse(Session.get('pagesLeft'));
       },
        pagesRight: function() {
            return JSON.parse(Session.get('pagesRight'));
        },
        isActive: function(url) {

            var routeName = null;

            if (Router.current()) {
                routeName = Router.current().url;
            }
            if (!routeName) {
                return '';
            }

            if (routeName.indexOf(url) !== -1) {
                return 'active';
            } else {
                return '';
            }
        },

        isOnAdmin: function() {

            //return true;

            var routeName = null;
            if (Router.current()) {
                routeName = Router.current().url;
            }
            if (!routeName) {
                return false;
            }

            if (routeName.indexOf('admin') !== -1) {
                return true;
            } else {
                return false;
            }

        }
    });

    Template.navbar.events({
        'click #log-out': function() {
            Meteor.logout();

            Router.go('/');
        }
    });

}