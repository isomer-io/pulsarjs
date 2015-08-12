/**
 * Created by wesley on 6/8/15.
 */

if (Meteor.isClient) {

    Navbar.add({
        url: '/jobs',
        menuName: 'Jobs',
        menuOrientation: 'left'
    });

    Session.setDefault("jobs.filter", false);


    Router.route('/jobs', function() {
       this.render('listJobsPage');
    });

    Template.listJobsPage.helpers({
       hasResults: function() {
           return Jobs.find().count();
       },
       isDisabled: function(filter) {
         if (Session.get('jobs.filter')  && filter === 'oldest-first') {
           return 'disabled';
         }
         if (!Session.get('jobs.filter') && filter === 'newest-first') {
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

    Template.listJobsPage.events({
        'click #oldest-first': function() {
            Jobs.findList.set({
               sort: {
                   createdAt: 1
               }
            });

            Session.set('jobs.filter', true);

        },
        'click #newest-first': function() {
            Jobs.findList.set({
                sort: {
                    createdAt: -1
                }
            });

            Session.set('jobs.filter', false);

        }
    });

}
