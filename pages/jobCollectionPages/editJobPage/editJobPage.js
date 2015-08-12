/**
 * Created by wesley on 6/8/15.
 */

if (Meteor.isClient) {


    Router.route('/jobs/:_id/edit', function() {

        //we must subscribe to the job we are showing!!!
        this.subscribe('job', this.params._id);

        //now let's query that job
        var job = Jobs.findOne({_id: this.params._id});

        //then set it as the 'this' object on the page
        this.render('editJobPage', {data: job});
    });

    //after they insert a new job, redirect back to
    //list of jobs

    //'insertJob' is the id of the quickform we
    //and 'updateJob' are the id's of the quickforms
    //we want to listen to, not the name of the page level templates
    AutoForm.addHooks('updateJob', {

        //the onSuccess method gets called after
        //a successful submit on either of the forms
        onSuccess: function(formType, result) {

            //this.docId is the _id of the document
            //the form just changed, so we will
            //load the url of that item and show the user
            //the result
            Router.go('/jobs/' + this.docId);
        }
    });

}