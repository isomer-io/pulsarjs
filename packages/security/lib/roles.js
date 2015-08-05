Options.set('forbidClientAccountCreation', false);

Options.set('defaultRoles', ['user']);

UserRole = new Roles.Role('user');

AdminRole = new Roles.Role('admin');

// Security.Rule.prototype.apply = function() {
//
//   console.log(this);
//
//   oldApply();
// };

// Security.Rule.prototype.apply = (function (original) {
//   return function () {
//     //do something additional
//     console.log('derp');
//     original();
//   }
// })(Security.Rule.prototype.apply);
//
// var oldApply = Security.Rule.prototype.apply;
//
// Security.Rule.prototype.apply = function() {
//
//   console.log(this);
//
//   oldApply.call();
// };s
