var connect = require('connect'),
    phonegap = require('connect-phonegap'),
    app = connect();

/*!
 * Create Connect server using the PhoneGap middleware.
 */

app.use(phonegap());

var port = process.env.PORT || 3000;
console.log('server is listening to '+ port);
app.listen(port);
