Meteor.methods({
  takeRequest:function(requestId){
    Requests.update({_id:requestId}, {$set:{
      takenBy:this.userId
    }});
  }
});
