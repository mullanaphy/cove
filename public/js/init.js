require.config({
  baseUrl: '/js',
  paths: {
    ramda: '/js/lib/ramda/0.0.17.min',
    text: '/js/lib/requirejs/text-2.0.10.min'
  }
});

require(['app'], function(APP) {
  var app = APP(1, document.getElementById('canvas'), {});
  app.run();
});
