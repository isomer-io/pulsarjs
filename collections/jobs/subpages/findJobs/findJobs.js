// Jobs.paginations = [];
//
// Jobs.paginations.push(new Meteor.Pagination(Jobs, {
//        infinite: true,
//        itemTemplate: 'jobInFindList',
//        templateName: "jobs",
//        sort: {
//            createdAt: -1
//        },
//        availableSettings: {
//            sort: true,
//            filter: true
//        },
//        filters:{
//          title:{
//            $text: {$search: 'Test'}
//          }
//        },
//        fastRender: true
// }));

// if(Meteor.isServer){
//   Jobs.paginations[0].set({
//     auth:function(){
//       // var results = EasySearch.search("Test");
//       // console.log(results);
//     }
//   });
// }

Jobs.initEasySearch('title');

if (Meteor.isClient) {

    Template.findJobs.onCreated(function() {

      Tracker.autorun(function(){

        // Jobs.paginations[0].set({
        //   sort: Template.currentData().sort || {},
        //   filter: Template.currentData().filter || {}
        // });
    });
  });


}
