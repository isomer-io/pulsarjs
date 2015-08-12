/**
 * Created by wesley on 6/8/15.
 */

if (Meteor.isClient) {

    Router.route('/requests/create', function() {
        this.render('createRequestPage');
    });

    //'insertRequest' is the id of the quickform we
    //and 'updateRequest' are the id's of the quickforms
    //we want to listen to, not the name of the page level templates
    AutoForm.addHooks('insertRequest', {

        //the onSuccess method gets called after
        //a successful submit on either of the forms
        onSuccess: function(formType, result) {

            //this.docId is the _id of the document
            //the form just changed, so we will
            //load the url of that item and show the user
            //the result
            Router.go('/requests/' + this.docId);
        }
    });

}