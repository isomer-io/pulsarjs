Package.describe({
  name: 'pulsarjs:imagecrop',
  summary: 'Image attribute for orion',
  version: '0.0.1',
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
    'image.js', 'fileTooLarge.html'
    ], 'client');

  api.export('Colibri');
});
