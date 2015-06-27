/**
 * Created by wesley on 6/23/15.
 */

if (Meteor.isClient) {

    var canReviewDocument = function(doc) {
        Meteor.call('canReviewDocument', doc, doc.getCollectionName(), function(err, res) {

            //TODO: use reactive var
            Session.set('Reviews.canReview', res);
        });
    };

    Template.insertReviewButton.onRendered(function() {
        var self = this;

        AutoForm.addHooks('insertReview', {
            before: {
                // Replace `formType` with the form `type` attribute to which this hook applies
                insert: function(doc) {
                    // Potentially alter the doc
                    doc.reviewDocument = self.data.doc._id;

                    doc.reviewDocumentCollectionName = self.data.doc.getCollectionName();

                    doc.reviewDocumentCreator = self.data.doc._id;

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
                canReviewDocument(self.data.doc);
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

        Meteor.call('canReviewDocument', this.data.doc, this.data.doc.getCollectionName(), function(err, res) {

            //TODO: use reactive var
            Session.set('Reviews.canReview', res);
        });

        Tracker.autorun(function() {

            if (Session.get('clientCall.charge.created')) {
                canReviewDocument(self.data.doc);
            }
        });

    });

    Template.findReviews.onRendered(function() {

        Reviews.findList.set({
            filters: {
                reviewDocument: this.data.doc._id
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
                    console.log('re-run');
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
            return Reviews.find({reviewDocument: this.doc._id}).count() > 0;
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