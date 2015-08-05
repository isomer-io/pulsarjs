Posts.paginations = [];

Posts.paginations.push(new Meteor.Pagination(Posts, {
       infinite: true,
       itemTemplate: 'postInFindList',
       templateName: "posts",
       sort: {
           createdAt: -1
       },
       availableSettings: {
           sort: true,
           filters: true
       },
       fastRender: true
}));

if (Meteor.isClient) {

    Template.findPosts.onCreated(function() {

      Tracker.autorun(function(){

        Posts.paginations[0].set({
          sort: Template.currentData().sort || {},
          filters: Template.currentData().filters || {}
        });
    });
  });


}
