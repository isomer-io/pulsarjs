/**
 * Define publications here
 */

Meteor.publish('publicProfile', function(userId) {
  fields = {}

  for(var key in Meteor.users.simpleSchema()._schema){
    if(key !== 'profile'){
      if(Meteor.users.simpleSchema()._schema[key].public){
        fields[key] = 1
      }
    }
  }

  return Meteor.users.find({_id:userId}, {fields:fields});
});


// Meteor.users.permit('insert').apply();
