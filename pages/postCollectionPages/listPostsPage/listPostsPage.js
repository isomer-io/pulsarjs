/**
 * Created by wesley on 6/8/15.
 */

if (Meteor.isClient) {

    Navbar.add({
        url: '/posts',
        menuName: 'Posts',
        menuOrientation: 'left'
    });

    Session.setDefault("posts.filter", false);


    Router.route('/posts', function() {
       this.render('listPostsPage');
    });

    Template.listPostsPage.helpers({
       hasResults: function() {
           return Posts.find().count();
       },
       isDisabled: function(filter) {
         if (Session.get('posts.filter')  && filter === 'oldest-first') {
           return 'disabled';
         }
         if (!Session.get('posts.filter') && filter === 'newest-first') {
           return 'disabled';
         }
        return '';
       }
    });

    Template.listPostsPage.events({
        'click #oldest-first': function() {
            Posts.findList.set({
               sort: {
                   createdAt: 1
               }
            });

            Session.set('posts.filter', true);

        },
        'click #newest-first': function() {
            Posts.findList.set({
                sort: {
                    createdAt: -1
                }
            });

            Session.set('posts.filter', false);

        }
    });

}
