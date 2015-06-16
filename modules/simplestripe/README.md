# Simple Stripe API

This library is a simplified version of [stripe-meteor](https://github.com/tyler-johnson/stripe-meteor), see those docs for a complete reference

# Installation

1. Create a meteor project
2. Create a packages directory in the project
3. Clone [simplestripe](https://github.com/macsj200/simplestripe) into packages folder
2. `meteor add maxjohansen:simplestripe`

# Usage

1. Add a settings.json file (copy format of samplesettings.json inside of package) to your project root directory and launch meteor `meteor --settings settings.json`
2. Add the `connectToStripeButtonTemplate` template somewhere in your UI `{{>connectToStripeButtonTemplate}}`.  This will create a merchant account for your user and attach stripe info to Meteor.user()
3. Add the `payForItemButtonTemplate` inside of your item to be purchased `{{>payForItemButtonTemplate}}`

# Notes

This is a very new project subject to drastic changes.