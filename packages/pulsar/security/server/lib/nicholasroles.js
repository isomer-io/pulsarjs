/**
 * Created by wesley on 6/13/15.
 */

/*
 * nicolaslopezj:roles support
 * Note: doesn't support groups
 */
if (Package && Package["nicolaslopezj:roles"]) {

    //var Roles = Package["nicolaslopezj:roles"].Roles;
    //
    //Security.defineMethod("ifHasRole", {
    //    fetch: [],
    //    transform: null,
    //    deny: function (type, arg, userId) {
    //        if (!arg) {
    //            throw new Error('ifHasRole security rule method requires an argument');
    //        }
    //        return !Roles.userHasRole(userId, arg);
    //    }
    //});
    //
    Security.defineMethod("ifCreatedByUser", {
        fetch: [],
        transform: null,
        deny: function (type, arg, userId, doc) {
            return userId !== doc.createdBy;
        }
    });

    //TODO: Finish defining 1 submission per user
    //Security.defineMethod("ifUserHadNotCreated")

}


