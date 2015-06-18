/**
 * Created by wesley on 6/2/15.
 */

if (Meteor.isClient) {

    Router.route('/', function() {
        this.render('homePage');

        GAnalytics.pageview();
    });

    Template.homePage.helpers({

    });

    Template.homePage.events({

    });

}