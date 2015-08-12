if (Meteor.isClient) {

  Template.requestCreatorControls.onCreated(function() {

     var requestId = Template.currentData().requestId;

     this.subscribe('request', requestId);
  });

  Template.requestCreatorControls.helpers({
    currentRequest: function() {
      var requestId = Template.currentData().requestId;
      return Requests.findOne({_id: requestId});
    }
  });

  Template.requestCreatorControls.events({
      'click #deleteRequestButton': function() {
          //'this' is the current doc we are showing
          Modal.show('confirmRequestDeleteModal', this);
      }
  });

}
