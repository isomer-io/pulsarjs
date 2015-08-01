
var createPage = function() {

  /*
  This is our pagination object. It lets us do an infinite
  scroll through our list. You probably don't want to change
  this unless you know what you are doing.
   */

   //create array here
   if (!Posts.paginations) {
     Posts.paginations = [];
   }

   Posts.paginations.push(new Meteor.Pagination(Posts, {
       infinite: true,
       itemTemplate: 'postInFindList',
       sort: {
           createdAt: -1
       },
       availableSettings: {
           sort: true
       },
       fastRender: true
   }));

   console.log('server called');

   return Posts.paginations.length - 1;

}

if(Meteor.isServer){

  Meteor.methods({
    initPagination:function(){

      createPage();

    }
  });
  
}

if (Meteor.isClient) {

    Template.findPosts.onCreated(function() {

      var index = 0;

        Meteor.call('initPagination', function() {
          index = createPage();

          Tracker.autorun(function(){

            Posts.paginations[index].set({
              sort: Template.currentData().sort || {},
              filter: Template.currentData().filter || {}
            });

          });

        });

    });

}
