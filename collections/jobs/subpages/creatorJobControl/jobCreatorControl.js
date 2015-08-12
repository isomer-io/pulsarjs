if (Meteor.isClient) {

  Template.jobCreatorControls.onCreated(function() {

     var jobId = Template.currentData().jobId;

     this.subscribe('job', jobId);
  });

  Template.jobCreatorControls.helpers({
    currentJob: function() {
      var jobId = Template.currentData().jobId;
      return Jobs.findOne({_id: jobId});
    }
  });

  Template.jobCreatorControls.events({
      'click #deleteJobButton': function() {
          //'this' is the current doc we are showing
          Modal.show('confirmJobDeleteModal', this);
      }
  });

}
