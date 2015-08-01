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
           filter: true
       },
       fastRender: true
}));

if (Meteor.isClient) {

    Template.findPosts.onCreated(function() {

      Tracker.autorun(function(){

        Posts.paginations[0].set({
          sort: Template.currentData().sort || {},
          filter: Template.currentData().filter || {}
        });
    });
  });


}
