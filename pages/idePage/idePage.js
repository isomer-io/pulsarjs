Router.route('idePage', {
    path: '/ide'
});

if(Meteor.isClient){
  Navbar.add({
      url: '/ide/',
      menuName: 'IDE',
      menuOrientation: 'left',
      requiresLogin: false
  });

  var outerEditor = null;

  Template.idePage.helpers({
    config:function(){
      return function(editor){
        outerEditor = editor;
        HTTP.get(Meteor.absoluteUrl("/sampleClientCode.js"), function(err,result){
          editor.setValue(result.content);
        });

        editor.setTheme('ace/theme/cobalt')
        editor.getSession().setMode('ace/mode/javascript')
        editor.setShowPrintMargin(false);
      }
    }
  });

  var indentBlock = function(block){
    var splitText = block.split("\n");

    block = "\n";

    for(var i = 0; i < splitText.length; i++){
      block = block + "\t" + splitText[i] + "\n";
    }

    return block;
  }

  var insertTemplate = function(args){
    HTTP.get(Meteor.absoluteUrl("/" + args.filename), function(err,result){
      var text = result.content;

      if(args.indentBlock){
        text = indentBlock(text);
      }

      outerEditor.env.document.insert(args.insertAt,text);
    });
  };

  Template.idePage.events({
    'click button.helpers':function(){
      insertTemplate({
        filename:"sampleHelperCode.js",
        indentBlock:true,
        insertAt:outerEditor.find("{").end
      });
    },
    'click button.events':function(){
      insertTemplate({
        filename:"sampleEventCode.js",
        indentBlock:true,
        insertAt:outerEditor.find("{").end
      });
    }
  });
}
