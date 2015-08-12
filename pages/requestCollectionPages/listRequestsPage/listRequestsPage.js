/**
 * Created by wesley on 6/8/15.
 */

if (Meteor.isClient) {

    Navbar.add({
        url: '/requests',
        menuName: 'Requests',
        menuOrientation: 'left'
    });

    Session.setDefault("requests.filter", false);


    Router.route('/requests', function() {
       this.render('listRequestsPage');
    });

    Template.listRequestsPage.helpers({
       hasResults: function() {
           return Requests.find().count();
       },
       isDisabled: function(filter) {
         if (Session.get('requests.filter')  && filter === 'oldest-first') {
           return 'disabled';
         }
         if (!Session.get('requests.filter') && filter === 'newest-first') {
           return 'disabled';
         }
        return '';
      },
      sortSettings: function() {
        return {
            createdAt: -1
        }
      }
    });

    Template.listRequestsPage.events({
        'click #oldest-first': function() {
            Requests.findList.set({
               sort: {
                   createdAt: 1
               }
            });

            Session.set('requests.filter', true);

        },
        'click #newest-first': function() {
            Requests.findList.set({
                sort: {
                    createdAt: -1
                }
            });

            Session.set('requests.filter', false);

        }
    });

}
