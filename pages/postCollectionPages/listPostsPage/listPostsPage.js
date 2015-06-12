/**
 * Created by wesley on 6/8/15.
 */

if (Meteor.isClient) {

    Navbar.add({
        url: '/posts',
        menuName: 'Posts',
        menuOrientation: 'left'
    });

    Router.route('/posts', function() {
       this.render('listPostsPage');
    });

    Template.listPostsPage.helpers({
       hasResults: function() {
           return Posts.find().count();
       }
    });

    Template.listPostsPage.events({
        'click #oldest-first': function() {
            Posts.findList.set({
               sort: {
                   createdAt: 1
               }
            });
        },
        'click #newest-first': function() {
            Posts.findList.set({
                sort: {
                    createdAt: -1
                }
            });
        }
    });

}