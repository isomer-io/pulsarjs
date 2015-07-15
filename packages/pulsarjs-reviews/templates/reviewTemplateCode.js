/**
 * Created by wesley on 6/23/15.
 */

if (Meteor.isClient) {

    var canReviewDocument = function(docId, collectionName) {
        Meteor.call('canReviewDocument', docId, collectionName, function(err, res) {

            //TODO: use reactive var
            Session.set('Reviews.canReview', res);

        });
    };

    Template.insertReviewButton.onCreated(function() {
        var self = this;

        console.log(Template.currentData());



        AutoForm.addHooks('insertReview', {
            before: {
                // Replace `formType` with the form `type` attribute to which this hook applies
                insert: function(doc) {
                    // Potentially alter the doc

                    doc.reviewDocument = self.data.docId;

                    doc.reviewDocumentCollectionName = self.data.collectionName;

                    //console.log(doc);

                    //return false;


                    // Then return it or pass it to this.result()
                    return doc;
                    //return false; (synchronous, cancel)
                    //this.result(doc); (asynchronous)
                    //this.result(false); (asynchronous, cancel)
                }
            },
            onSuccess: function() {
                Modal.hide();
                canReviewDocument(Template.currentData().docId, Template.currentData().collectionName);
            }
        });

    });

    Template.insertReviewButton.events({
        'click .btn': function() {
            Modal.show('insertReviewModal');
        }
    });

    Template.insertReviewButton.helpers({
        canReview: function() {
            return Session.get('Reviews.canReview');
        }
    });

    Template.insertReviewButton.onRendered(function() {
        Session.setDefault('Reviews.canReview', false);

        var self = this;

        canReviewDocument(Template.currentData().docId, Template.currentData().collectionName);

        Tracker.autorun(function() {

            if (Meteor.user() && Meteor.user().clientCall && Meteor.user().clientCall.charge) {
                canReviewDocument(Template.currentData().docId, Template.currentData().collectionName);
            }
        });

    });

    Template.findReviews.onRendered(function() {

      console.log(this.data);

      var self = this;

        //TODO: check that we are grabbing from correct collection
        Reviews.findList.set({
            filters: {
                reviewDocument: self.data.docId
            }
        });


    });

    Template.findOneReview.helpers({
        stars: function() {

            //TODO: less hacky

            var result = [];
            for (var i = 0; i < this.numberOfStars; i++) {
                result.push(1);
            }

            return result;
        }
    });

    Template.findReviews.helpers({
        isDisabled: function(type) {
            if (type === Session.get('Reviews.filter')) {
                if (Session.get('Reviews.filter') === 'highest') {
                    Reviews.findList.set({
                        sort: {
                            //reviewDocument: this.doc._id,
                            numberOfStars: -1
                        }
                    });
                }
                if (Session.get('Reviews.filter') === 'lowest') {
                    Reviews.findList.set({
                        sort: {
                            //reviewDocument: this.doc._id,
                            numberOfStars: 1
                        }
                    });
                }
                if (Session.get('Reviews.filter') === 'newest') {
                    Reviews.findList.set({
                        sort: {
                            //reviewDocument: this.doc._id,
                            createdAt: -1
                        }
                    });
                }
                return 'disabled';
            } else {
                return '';
            }
        },
        anyReviews: function() {
            return Reviews.find({reviewDocument: this.docId}).count() > 0;
        },
        transactionMode: function() {
            return LaunchBox.collections[this.collectionName].reviewSettings.transactionReviewMode;
        },
        creatorReview: function() {
                var collection = LaunchBox.collections[this.collectionName];
                var doc = collection.findOne({_id: this.docId});
                return Reviews.findOne({reviewDocument: this.docId, createdBy: doc.createdBy});

        },
        buyerReview: function() {


            if ( Charges.findOne({chargeTargetDocId: this.docId}) ) {
                var doc = collection.findOne({_id: this.docId});
                return Reviews.findOne({reviewDocument: this.docId, createdBy: {$not: doc.createdBy} });
            }

        }
    });

    Template.findReviews.events({
        'click #highest': function() {
            Session.set('Reviews.filter', 'highest');
        },
        'click #lowest': function() {
            Session.set('Reviews.filter', 'lowest');
        },
        'click #newest': function() {
            Session.set('Reviews.filter', 'newest');
        }
    });


    Session.setDefault('Reviews.filter', 'highest');
    //Tracker.autorun(function() {
    //    console.log('tracker called');
    //
    //    //error handling
    //    if (!this.doc) {
    //        return;
    //    }
    //
    //     if (Session.get('Reviews.filter') === 'highest') {
    //         Reviews.findList.set({
    //             filters: {
    //                 reviewDocument: this.doc._id,
    //                 numberOfStars: 1
    //             }
    //         });
    //     }
    //    if (Session.get('Reviews.filter') === 'lowest') {
    //        console.log('re-run');
    //        Reviews.findList.set({
    //            filters: {
    //                reviewDocument: this.doc._id,
    //                numberOfStars: 1
    //            }
    //        });
    //    }
    //    if (Session.get('Reviews.filter') === 'newest') {
    //        Reviews.findList.set({
    //            filters: {
    //                reviewDocument: this.doc._id,
    //                createdAt: 1
    //            }
    //        });
    //    }
    //});

}
