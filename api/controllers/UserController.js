var twilio = require ('twilio'),
	 qs = require('querystring');
var processRequest = function(req, callback) {
    var body = '';
    req.on('data', function (data) {
        body += data;
    });
    req.on('end', function () {
        callback(qs.parse(body));
    });
};



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
var resp = new twilio.TwimlResponse();
var from;
	processRequest(req, function(data) {
		from = data.From;
		resp.message("Message recieved; thanks for using CommunityUnite!");
		res.writeHead(200, {
                'Content-Type':'text/xml'
        });	
	Messages.create( { callerID : data.From, body : 'testing' });
	res.end(resp.toString()); 
	});	
}

};
