var apiai = require('apiai');
 
var app = apiai("b634af6693c54b1289f0c5e7054a83b5");
 
var request = app.textRequest('get news on google', {
    sessionId: 'P0pm31BPwq',
    username: 'Zaphod',
    password: 'Beeblebrox'
});
 
request.on('response', function(response) {
    console.log(response);
    // you can run tests of the api_ai controller here
/*    var newRequest = app.textRequest('what price is google stock', {
      sessionId : 'ab7acadab7a',
      username : 'rmcooke@nu-worx.com',
      password: 'Anathema~42', }); */
});
 
request.on('error', function(error) {
    console.log(error);
});
 

