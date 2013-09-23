(function () {
  'use strict';

  has.add('debug', function(){
    return true;
  }, true);

  var App = Ember.Application.create({
    LOG_TRANSITIONS: true
  });

  App.VERSION = '0.0.0';

  window.App = App;

  // App code begins here...
  if (has('debug')) {
    console.log('Congrats! You are in DEBUG mode');
  }
})();