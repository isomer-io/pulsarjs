/**
 * Created by wesley on 6/8/15.
 */

if (Meteor.isClient) {

  // Router.map(function() {
  //   this.route('request', {
  //       path: '/requests/:_id',
  //       template: 'viewOneRequestPage', // <-- to be explicit
  //       data: function() {
  //           return {id: this.params._id};
  //       }
  //   });
  // });

  Router.route('/requests/:_id', function () {
    this.render('viewOneRequestPage', {
        data: function () {
          return {id: this.params._id};
        }
      });
    });
    // Router.route('/requests/:_id', function() {
    //
    //     //we must subscribe to the request we are showing!!!
    //     this.subscribe('request', this.params._id);
    //
    //     //now let's query that request
    //     var request = Requests.findOne({_id: this.params._id});
    //
    //     //then set it as the 'this' object on the page, using the data object
    //     this.render('viewOneRequestPage', {data: {id: this.params._id}});
    // });

    //This is how you display a modal
    //In this case, we are displaying a modal to
    //confirm that the user wants to delete a specific request
    Template.viewOneRequestPage.events({
        'click #deleteRequestButton': function() {

            //'this' is the current doc we are showing
            Modal.show('confirmRequestDeleteModal', this);
        }
    });

}
