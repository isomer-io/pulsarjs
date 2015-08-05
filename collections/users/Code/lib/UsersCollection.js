SimpleSchema.extendOptions({
  public: Match.Optional(Boolean)
});

Schema = {}

Schema.UserProfile = new SimpleSchema({
    birthday: {
        type: Date,
        optional: true,
        public:true
    },
    lastName: {
        type: String,
        optional:true,
        public:true
    },
    firstName: {
        type: String,
        optional:true,
        public:true
    },
    address:{
        type:new SimpleSchema({
            city: {
                type: String,
                max: 50
            },
            state: {
                type: String,
                allowedValues:['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'],
                regEx: /^A[LKSZRAEP]|C[AOT]|D[EC]|F[LM]|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEHINOPST]|N[CDEHJMVY]|O[HKR]|P[ARW]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]$/
            },
            zip: {
                type: String,
                regEx: /^[0-9]{5}$/,
                optional:true
            }
        }),
        optional:true
    },
    payPalEmail: {
        type:String,
        optional:true,
        public:true
    },
    referredBy:{
        type:String,
        optional:true,
        public:true
    },
    profileDescription:{
        type:String,
        optional:true,
        public: true
    },
    profilePicture:orion.attribute('image', {
        label: 'Image',
        autoform:{
            aspectRatio:16/9,
            maxSizeMb:40
        },
	optional:true
    })

});

Schema.User = new SimpleSchema({
  emails: {
      type: [Object],
      // this must be optional if you also use other login services like facebook,
      // but if you use only accounts-password, then it can be required
      optional: true
  },
  "emails.$.address": {
      type: String,
      regEx: SimpleSchema.RegEx.Email
  },
  "emails.$.verified": {
      type: Boolean
  },
  createdAt: {
      type: Date
  },
  profile: {
      type: Schema.UserProfile,
      optional: true
  },
  services: {
      type: Object,
      optional: true,
      blackbox: true
  },
  stripe:{
    type:Object,
    optional:true,
    blackbox:true
  }
});

Meteor.users.attachSchema(Schema.User);

if(Meteor.isClient){
  AutoForm.hooks({

  });
}
