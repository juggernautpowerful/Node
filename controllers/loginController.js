const db = require("../model/repository");
const psw = require("../libs/password");


module.exports.get = function(req, res) {
    console.log("!!!")
    if (req.session.isAuth) {
      res.redirect('/admin');
    }
  
    res.render('pages/login', { ...req.session.sessionStore });
  };

module.exports.post = (req, resp, next) => {
  const { email, password } = req.body;
  const session = req.session;
  var user = db.getUser();

  if (user.email === email && psw.validPassword(password)) {
    session.sessionStore.isAuth = true;
    session.sessionStore.msglogin = "Вы успешно авторизованы.";
    resp.redirect("/login");
  } else {
    session.sessionStore.isAuth = false;
    session.sessionStore.msglogin = "Ошибка авторизации.";
    resp.redirect("/login");
  } 
};