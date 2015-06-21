if(Meteor.isServer){
    Meteor.startup(function(){

        /**
         * Created by maxjohansen on 6/20/15.
         */
        //they can only insert if they are a user
        Refunds.permit('insert').ifLoggedIn().apply();

        //can update if they are logged in and the document was created by them
        Refunds.permit('update').ifLoggedIn().ifCreatedByUser().apply();

        //can update if they are an admin
        Refunds.permit('update').ifHasRole('admin').apply();

        //can remove if they are logged in and the document was created by them
        //Refunds.permit('remove').ifLoggedIn().ifCreatedByUser().apply();

        //can remove if they are an admin
        Refunds.permit('remove').ifHasRole('admin').apply();
    });
}
