if(Meteor.isServer){
    Meteor.publish("userData", function () {
        if (this.userId) {
            return Meteor.users.find({_id: this.userId},
                {fields: {'stripe': 1,'transactions':1}});
        } else {
            this.ready();
        }
    });

    Meteor.methods({
        obtainAccessToken:function(query){
            if(query.error){
                console.log(query.error);
                return query.error;
            } else{
                if(!Meteor.users.findOne(this.userId).stripe){
                    var url = "https://connect.stripe.com/oauth/token?" + "code=" + query.code +"&client_secret=" + orion.config.get('STRIPE_API_SECRET') + "&grant_type=authorization_code";

                    var result = Meteor.http.call("POST", url);

                    Meteor.users.update({_id:this.userId}, {$set: {stripe: result.data} } );

                    if(result.data.stripe_user_id){
                        Roles.addUserToRoles(this.userId, 'vendor');
                    }

                    return result.data;
                } else {
                    console.log('User already has stripe profile');
                }
            }
        },
        chargeCard:function(token,item){
            var Stripe = StripeAPI(orion.config.get('STRIPE_API_SECRET'));

            var user = Meteor.users.findOne(this.userId);

            var charge = null;

            var res = Async.runSync(function(done) {
                Stripe.charges.create({
                    amount: Math.round(item.price * 100),
                    currency: 'usd',
                    source: token.id,
                    destination: Meteor.users.findOne(item.createdBy).stripe.stripe_user_id
                }, function (err, chargeObj) {
                    console.log(err,chargeObj);

                    charge = chargeObj;

                    done(err, chargeObj);
                })
            });

            if(!user.transactions){
                user.transactions = [];
                Meteor.users.update({_id:this.userId}, {$set: {transactions: user.transactions} } );
            }

            Meteor.users.update({_id:this.userId}, {$push: {transactions: charge} } );

            console.log(Meteor.users.findOne(this.userId).transactions);

            return res;
        }
    });

}