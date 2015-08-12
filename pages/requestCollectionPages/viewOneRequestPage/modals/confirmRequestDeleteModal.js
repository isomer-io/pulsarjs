/**
 * Created by wesley on 6/8/15.
 */

if (Meteor.isClient) {

    /*
     After they click the confirm delete button,
     we remove the request document, hide the modal,
     and re-direct them to the list of requests
     */
    Template.confirmRequestDeleteModal.events({
        'click #confirmDelete': function() {
            Requests.remove(this._id, function() {
                Modal.hide();
                Router.go('/requests');
            });
        }
    });

}