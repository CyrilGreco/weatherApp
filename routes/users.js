var express = require('express');
var router = express.Router();
var userModel = require('../models/users');

// définiton de la route SIGN-IN.
router.post('/sign-in', async function (req, res, next) {
	var userData = await userModel.find();

	// Tester si la ville recherchée est déjà présente dans la liste
	let notRegistered = true;

	let emailtest = req.body.email.toLowerCase();

	for (var i = 0; i < userData.length; i++) {
		if (userData[i].email.toLowerCase() === emailtest) {
			notRegistered = false;
		}
	}
	if (notRegistered === false) {
		// stockez le nom et l’ID en session
		req.session.user = { name: req.body.username, id: req.body._id };
		res.redirect('/weather');
	} else {
		res.redirect('/');
	}
});

// définiton de la route SIGN-UP.
router.post('/sign-up', async function (req, res, next) {
	var userData = await userModel.find();
	emailalreadyregistered = false;

	var emailtest = req.body.email;

	for (var i = 0; i < userData.length; i++) {
		if (userData[i].email === emailtest) {
			emailalreadyregistered = true;
		}

		if (emailalreadyregistered === true) {
			res.redirect('/');
		} else {
			var newUser = new userModel({
				username: req.body.username,
				email: req.body.email,
				password: req.body.password,
			});

			// pour les sauvegarder le nouvel utilisateur en base de données.
			var newUser = await newUser.save();
			// stockez le nom et l’ID en session
			req.session.user = { name: newUser.username, id: newUser._id };
		}
	}
});

// route de deconnexion

router.get('/logout', function (req, res, next) {
	req.session.user = null;
	res.redirect('/');
});

module.exports = router;
