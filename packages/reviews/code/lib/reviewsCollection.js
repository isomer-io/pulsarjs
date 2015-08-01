/*
    Here we create our collection. This is the same as
    a normal mongo collection, but you must also pass
    an object with configuration settings for the admin panel
 */
Reviews = new orion.collection('reviews', {
    singularName: 'review', // The name of one of these items
    pluralName: 'reviews', // The name of more than one of these items

    /*
    Tabular settings for this collection, this must be filled out
    correctly for the admin panel to work
     */
    tabular: {
        columns: [
            { data: "title", title: "Title" },
        /*
            If you want to show a custom orion attOnribute in
            the index table you must call this function
            orion.attributeColumn(attributeType, key, label)
         */
            orion.attributeColumn('image', 'image', 'Image'),
            orion.attributeColumn('summernote', 'body', 'Content'),
            orion.attributeColumn('createdBy', 'createdBy', 'Created By'),
            orion.attributeColumn('createdAt', 'createdAt', 'Created At'),
            orion.attributeColumn('updatedAt', 'updatedAt', 'Updated At')
        ]
    }
});

/*
    Now we will attach the schema for the posts collection.
    The schema defines the structure and rules of data
    that allowed for each document in this collection.
 */
Reviews.attachSchema(new SimpleSchema({
    title: {
        type: String
    },
    /*
        Here it's the same with an image attribute.
        summernote is an html editor.
     */
    body: {
        type: String
    },

    numberOfStars: {
        type: Number,
        min: 0,
        max: 5
    },

    reviewDocument: {
        type: String,
        autoform: {
            omit: true
        }
    },

    reviewDocumentCollectionName: {
        type: String,
        autoform: {
            omit: true
        }
    },

    /*
    This attribute sets the user id to that of the user that created
    this post automatically.  */
    createdBy: orion.attribute('createdBy'),

    createdAt: orion.attribute('createdAt'),

    updatedAt: orion.attribute('updatedAt')


}));

/*
This is our pagination object. It lets us do an infinite
scroll through our list. You probably don't want to change
this unless you know what you are doing.
 */
Reviews.findList = new Meteor.Pagination(Reviews, {
    infinite: true,
    itemTemplate: 'reviewInFindList',
    sort: {
        createdAt: -1
    },
    availableSettings: {
        sort: true,
        filters: true
    },
    fastRender: true
});
