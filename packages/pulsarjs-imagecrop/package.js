Package.describe({
  name: 'wesleyfsmith:pulsarjs-imagecrop',
  summary: 'Image attribute for orion',
  version: '1.1.4',
  git: 'https://github.com/IsomerEDU/LaunchBox'
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@1.0');

  api.use([
    'orionjs:base@1.1.0',
    'orionjs:attributes@1.1.0',
    'orionjs:filesystem@1.1.0',
    'less'
    ]);

  api.addFiles([
    'attribute.js',
    ]);

  api.addFiles([
    'colibri.js',
    'helper.js',
    'wrongfiletype.html',
    'image.html',
    'image.less',
    'image.js',
    ], 'client');

  api.export('Colibri');
});
