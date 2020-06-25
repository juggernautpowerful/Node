const db = require("../model/repository");
const psw = require("../libs/password");

module.exports.get = function (req, res) {
	console.log(req.session.sessionStore);
	if (req.session.sessionStore.isAuth !== true) {
		res.redirect("/login");
	}

	res.render("pages/admin", {
		...req.session.sessionStore,
	});
};

module.exports.postSkills = function (req, res) {
	const { age, concerts, cities, years } = req.body;
	db.saveSkills({
		age,
		concerts,
		cities,
		years,
	});
	req.session.sessionStore.msgskill = "vuh!!";
	res.redirect("/admin");
};

module.exports.postProducts = function (req, res) {
	const { name, price } = req.body;
	const { file } = req.files.photo;
	console.log(req.files.photo);
	req.session.sessionStore.msgfile = "vuh!!";
	db.addProducts({
		src: file.replace("public\\", ""),
		name: name,
		price: price,
	});
	res.redirect("/admin");
};
