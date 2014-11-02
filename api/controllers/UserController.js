/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
 login: function (req, res) {
    var bcrypt = require('bcrypt');

    User.findOneByEmail(req.body.email).done(function (err, user) {
      if (err) res.json({ error: 'DB error' }, 500);

      if (user) {
        bcrypt.compare(req.body.password, user.password, function (err, match) {
          if (err) res.json({ error: 'Server error' }, 500);

          if (match) {
            // password match
            req.session.user = user.id;
            res.json(user);
          } else {
            // invalid password
            if (req.session.user) req.session.user = null;
            res.json({ error: 'Invalid password' }, 400);
          }
        });
      } else {
        res.json({ error: 'User not found' }, 404);
      }
    });
  },
  view: function (req, res) {
	Messages.find(function (err, models) {
	if (err) return res.send(err, 500);
	else res.send ({apps : models});
	});
 },
  post: function (req, res) {
	
 },
 recieve: function (req, res) {
var twilio = require ('twilio'),
  qs = require('querystring');

var from = "";
//	if (req.method == 'POST') 
	/*var body = '';
	req.on('data', function (data) {
	body += data;
	if (body.length > 1e6) req.connection.destroy();
	});
	req.on('end', function () { var post = qs.parse(body);
	from = post.From;
	});*/

	console.log(req.From);


	Messages.create( { callerID : 'testing', body : 'testing' }).exec(function(err, model) { 
	if (err)
		process.stdout.write("Error: Something went wrong!" + err);	
       		console.log( model );	
//	});
 	 });

var resp = new twilio.TwimlResponse();
resp.message("Message recieved; thanks for using CommunityUnite!");
res.setHeader('content-type', 'text/XML');
res.end(resp.toString()); 
 }	

};

