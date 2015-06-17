/**
 * Created by maxjohansen on 6/17/15.
 */

orion.config.add('BOOTSWATCH_THEME_URL', 'bootswatch');

if(Meteor.isClient){
    Meteor.startup(function(){
        Meteor.autorun(function(){
            var css = document.createElement('link');
            css.setAttribute('rel', 'stylesheet');
            css.setAttribute('href', orion.config.get('BOOTSWATCH_THEME_URL'));
            document.getElementsByTagName('head')[0].appendChild(css);
        });
    });
}
