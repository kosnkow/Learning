var heroin = require('heroin-js');
 
var configurator = heroin(process.env.HEROKU_API_TOKEN);
 
configurator.export('bookinvent').then(function(result) {
    console.log(result);
}); 