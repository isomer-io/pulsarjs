if (Meteor.isClient) {
  Template.findOneRequest.onCreated(function() {
     var requestId = Template.currentData().requestId;

     this.subscribe('request', requestId);
  });

  Template.findOneRequest.helpers({
    currentRequest: function() {
      var requestId = Template.currentData().requestId;
      return Requests.findOne({_id: requestId});
    },
    isTaken:function(){
      var requestId = Template.currentData()._id;
      return Requests.findOne({_id: requestId}).takenBy;
    }
  });

  Template.findOneRequest.events({
    'click .takeRequest':function(){
      var requestId = Template.currentData().requestId;

      Meteor.call('takeRequest', requestId);
    }
  });

}
