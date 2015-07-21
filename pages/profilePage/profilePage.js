/**
 * Created by wesley on 6/3/15.
 */

if (Meteor.isClient) {

    Navbar.add({
        url: '/profile/',
        menuName: 'Account',
        menuOrientation: 'right',
        requiresLogin: true
    });

    Router.route('/profile/:_id', function() {

        this.render('profilePage', {
          data: function(){
            return {id:this.params._id}
          }
        });

    });

    Router.route('/profile', function() {
      this.render('profilePage', {
        data: function() {
          return {id: Meteor.userId()}
        }
      })
    });

    Template.profilePage.helpers({
      isOwnId:function(){
        return Template.currentData().id === Meteor.userId();
      },
    });


}

Options.set('forbidClientAccountCreation', false);
