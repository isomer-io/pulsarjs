/**
 * Created by wesley on 6/8/15.
 */

if (Meteor.isClient) {

    /*
     After they click the confirm delete button,
     we remove the job document, hide the modal,
     and re-direct them to the list of jobs
     */
    Template.confirmJobDeleteModal.events({
        'click #confirmDelete': function() {
            Jobs.remove(this._id, function() {
                Modal.hide();
                Router.go('/jobs');
            });
        }
    });

}