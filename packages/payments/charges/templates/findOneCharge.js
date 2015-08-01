/**
 * Created by wesley on 6/29/15.
 */

if (Meteor.isClient) {

    var selectedChargeId = '';

    Template.findOneCharge.events({
        'click .refundButton': function() {

            selectedChargeId = this.id;

           Modal.show('requestRefundModal', this);

           return false;
        }
    });

    AutoForm.addHooks('insertRefund', {
        before: {
            // Replace `formType` with the form `type` attribute to which this hook applies
            insert: function(doc) {
                // Potentially alter the doc
                doc.chargeId = selectedChargeId;

                console.log(selectedChargeId);

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
        }
    });

}