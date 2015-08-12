/**
 * Created by wesley on 6/8/15.
 */

if (Meteor.isClient) {

  // Router.map(function() {
  //   this.route('job', {
  //       path: '/jobs/:_id',
  //       template: 'viewOneJobPage', // <-- to be explicit
  //       data: function() {
  //           return {id: this.params._id};
  //       }
  //   });
  // });

  Router.route('/jobs/:_id', function () {
    this.render('viewOneJobPage', {
        data: function () {
          return {id: this.params._id};
        }
      });
    });
    // Router.route('/jobs/:_id', function() {
    //
    //     //we must subscribe to the job we are showing!!!
    //     this.subscribe('job', this.params._id);
    //
    //     //now let's query that job
    //     var job = Jobs.findOne({_id: this.params._id});
    //
    //     //then set it as the 'this' object on the page, using the data object
    //     this.render('viewOneJobPage', {data: {id: this.params._id}});
    // });

    //This is how you display a modal
    //In this case, we are displaying a modal to
    //confirm that the user wants to delete a specific job
    Template.viewOneJobPage.events({
        'click #deleteJobButton': function() {

            //'this' is the current doc we are showing
            Modal.show('confirmJobDeleteModal', this);
        }
    });

}
