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

        var body = '';
        req.on('data', function (data) {
            body += data;

            // Too much POST data, kill the connection!
            if (body.length > 1e6)
                req.connection.destroy();
        });

        req.on('end', function () {
 	     	var post = qs.parse(body);
		Messages.create().exec(function(err, model) { 
	if (err)
		res.send("Error: Something went wrong!" + err);
	else {
		model.setProperties( {
			callerID: post["From"],
			body: post	
		});
		model.save(function (err) {
			if (err) res.send("Error:" + err); });
		
           process.stdout.write(post["From"]);
           process.stdout.write(post.From);
		res.send("Successful");	
	}
           process.stdout.write(post["From"]);
	   process.stdout.write(post);
            // use post['blah'], etc.
        });
 	 }); 
 }	
};

