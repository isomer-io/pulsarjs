if (Meteor.isClient) {
  Template.findOneJob.onCreated(function() {

     var jobId = Template.currentData().jobId;

     this.subscribe('job', jobId);
  });

  Template.findOneJob.helpers({
    currentJob: function() {
      var jobId = Template.currentData().jobId;
      return Jobs.findOne({_id: jobId});
    }
  });

}
