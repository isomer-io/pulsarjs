Requests.paginations = [];

Requests.paginations.push(new Meteor.Pagination(Requests, {
       infinite: true,
       itemTemplate: 'requestInFindList',
       templateName: "requests",
       sort: {
           createdAt: -1
       },
       availableSettings: {
           sort: true,
           filter: true
       },
       fastRender: true
}));

if (Meteor.isClient) {

    Template.findRequests.onCreated(function() {

      Tracker.autorun(function(){

        Requests.paginations[0].set({
          sort: Template.currentData().sort || {},
          filter: Template.currentData().filter || {}
        });
    });
  });


}
