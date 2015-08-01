/*
    Here we create our collection. This is the same as
    a normal mongo collection, but you must also pass
    an object with configuration settings for the admin panel
 */
Charges = new orion.collection('charges', {
    singularName: 'charge', // The name of one of these items
    pluralName: 'charges', // The name of more than one of these items

    /*
    Tabular settings for this collection, this must be filled out
    correctly for the admin panel to work
     */
    tabular: {
        //columns: [
        //    { data: "title", title: "Title" },
        ///*
        //    If you want to show a custom orion attOnribute in
        //    the index table you must call this function
        //    orion.attributeColumn(attributeType, key, label)
        // */
        //    orion.attributeColumn('image', 'image', 'Image'),
        //    orion.attributeColumn('summernote', 'body', 'Content'),
        //    orion.attributeColumn('createdBy', 'createdBy', 'Created By'),
        //    orion.attributeColumn('createdAt', 'createdAt', 'Created At'),
        //    orion.attributeColumn('updatedAt', 'updatedAt', 'Updated At')
        //]
    }
});

/*
    Now we will attach the schema for the posts collection.
    The schema defines the structure and rules of data
    that allowed for each document in this collection.
 */
Charges.attachSchema(new SimpleSchema({


    stripeChargeObj: {
        type: Object,
        blackbox: true
    },
    chargeId: {
        type: String,
        index: true,
        unique: true
    },
    chargeTargetDocId: {
        type: String,
        index: true
    },
    createdBy: {
        type: String,
        index: true
    },
    createdAt: orion.attribute('createdAt')

}));

/*
This is our pagination object. It lets us do an infinite
scroll through our list. You probably don't want to change
this unless you know what you are doing.
 */
Charges.findList = new Meteor.Pagination(Charges, {
    infinite: true,
    itemTemplate: 'findOneCharge',
    sort: {
        createdAt: -1
        //createdBy: this.userId
    },
    availableSettings: {
        sort: true,
        filters: true
    },
    fastRender: true
});

if (Meteor.isClient) {
    Template.findCharges.onRendered(function() {
        Charges.findList.set({
            filters: {
                createdBy: Meteor.userId()
            }
        });
    });
}
