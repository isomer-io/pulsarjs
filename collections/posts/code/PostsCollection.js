/**
 * Created by wesley on 5/31/15.
 */


Posts = new orion.collection('posts', {
    singularName: 'post', // The name of one of these items
    pluralName: 'posts', // The name of more than one of these items

    /**
     * Tabular settings for this collection, this must be filled out
     * correctly for the admin panel to work
     */
    tabular: {
        columns: [
            { data: "title", title: "Title" },
        /**
         * If you want to show a custom orion attribute in
         * the index table you must call this function
         * orion.attributeColumn(attributeType, key, label)
         */
            orion.attributeColumn('file', 'image', 'Image'),
            orion.attributeColumn('summernote', 'body', 'Content'),
            orion.attributeColumn('createdBy', 'createdBy', 'Created By')
        ]
    }
});

//save the created at time each time is inserted
Posts.before.insert(function(userId, doc) {
   doc.createdAt = Date.now();
});

/*
This is our pagination object. It lets us do an infinite
scroll through our list
 */
var pages = new Meteor.Pagination(Posts, {
    infinite: true,
    infiniteItemsLimit: 100,
    itemTemplate: 'postInList',
    sort: {
        createdAt: -1
    }
});

/**
 * Now we will attach the schema for that collection.
 * Orion will automatically create the corresponding form.
 */
Posts.attachSchema(new SimpleSchema({
    title: {
        type: String
    },

    /**
     * The file attribute is a custom orion attribute
     * This is where orion does its magic. Just set
     * the attribute type and it will automatically
     * create the form for the file.
     * WARNING: the url of the image will not be saved in
     * .image, it will be saved in .image.url.
     */
    image: orion.attribute('file', {
        label: 'Image',
        optional: true
    }),

    /**
     * Here it's the same with an image attribute.
     * summernote is an html editor.
     */
    body: orion.attribute('summernote', {
        label: 'Body'
    }),

    /**
     * This attribute sets the user id to that of the user that created
     * this post automatically.
     */
    createdBy: orion.attribute('createdBy')

}));

if (Meteor.isServer) {

    /**
     *
     * Define your security permissions here
     *
     */

    //they can only insert if they are a user
    Posts.permit('insert').ifLoggedIn().apply();

    //can update if they are logged in and the document was created by them
    Posts.permit('update').ifLoggedIn().ifCreatedByUser().apply();

    //can update if they are an admin
    Posts.permit('update').ifHasRole('admin').apply();

    //can remove if they are logged in and the document was created by them
    Posts.permit('remove').ifLoggedIn().ifCreatedByUser().apply();

    //can remove if they are an admin
    Posts.permit('remove').ifHasRole('admin').apply();




}

