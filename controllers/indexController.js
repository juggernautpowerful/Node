const db = require("../model/repository");
const psw = require("../libs/password");
require("dotenv").config();
const sgMail = require('@sendgrid/mail')

module.exports.get = function (req, res) {
  const products =  db.getProducts() || [];
  
  console.log(products)
	const { age, concerts, cities, years } =  db.getSkills() || {age:10, concerts:2, cities:5, years:4};
	const skills = [
		{
			number: age,
			text: "Возраст начала занятий на скрипке",
		},
		{
			number: concerts,
			text: "Концертов отыграл",
		},
		{
			number: cities,
			text: "Максимальное число городов в туре",
		},
		{
			number: years,
			text: "Лет на сцене в качестве скрипача",
		},
	];
  console.log("products: ", products);
  //console.log("body", req.body);
	res.render("pages/index",  { skills: skills, products: products, ...req.session.sessionStore});
};

module.exports.email = (req, res) => {
	const { name, email, message } = req.body;
  let logmsg = "Письмо отправлено.";
	try {
		console.log(
			"the value for SEND_GRID_API_KEY is: ",
			process.env.SEND_GRID_API_KEY
		);
		sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
		const msg = {
			to: "nechaevon@lgt.ru",
			from: email,
			subject: `Sending email from ${name}`,
			text: message,
    };
		sgMail.send(msg).then(() => {
      console.log('Message sent')
  }).catch((error) => {
      console.log(error.response.body)
      req.session.sessionStore.msgemail = error.response.body;
  })
    req.session.sessionStore.msgemail = "Письмо отправлено.";
    res.redirect("/");
	} catch (err) {
    req.session.sessionStore.msgemail = err.toString();
		res.redirect("/");
	}
};
