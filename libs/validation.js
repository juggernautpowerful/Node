const Joi = require('@hapi/joi');

module.exports.loginValidation = (req, res, next) => {
  const schema = Joi.object({
    password: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
  });

  const { email, password } = req.body;
  try {
    const { value, error } = schema.validate({
      email: email,
      password: password,
    });

    if (error) {
      req.session.sessionStore.msglogin = error.toString();
      res.redirect('/login');
    }
  } catch (err) {
    req.session.sessionStore.msglogin = err.toString();
    res.redirect('/login');
  }
    next();
};

module.exports.skillsValidation = (req, res, next) => {
  const { age, concerts, cities, years } = req.body;

  const schema = Joi.object({
    age: Joi.number().min(0).max(200).required(),
    concerts: Joi.number().min(0).required(),
    cities: Joi.number().min(0).required(),
    years: Joi.number().min(0).required(),
  });

  req.session.sessionStore.msgskill = "";

  try {
    const { value, error } = schema.validate({
      age,
      concerts,
      cities,
      years,
    });

    if (error) {
      req.session.sessionStore.msgskill = error.toString();
      req.body.msgskill = error.toString();
      console.log(error.toString());
      res.redirect('/admin');
    }
    req.session.sessionStore.msgskill = "Сохранено";
  } catch (err) {
    req.session.sessionStore.msgskill = err.toString();
    res.redirect('/admin');
  }
  next();
};

module.exports.productsValidation = (req, res, next) => {
  console.log("productsValidation");
  let { name, price } = req.body;
  console.log(req.body);
  const schemaFile = Joi.object({
    name: Joi.string().min(1).max(300).required(),
    size: Joi.number().integer().min(1).required(),
  });

  const schemaDescr = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().min(1).required(),
  });

  req.session.sessionStore.msgfile = "";

  try {
    let { error } = schemaDescr.validate({
      name,
      price,
    });
    console.log(req.files);
    let { size } = req.files.photo;
    console.log(req.files.photo.name);
    name = req.files.photo.name;
    const { errorFile } = schemaFile.validate({
      name,
      size,
    });

    if (errorFile) {
      session.myStore.msgfile = errorFile.toString();
      req.body.msgfile = errorFile.toString();
      console.log(errorFile.toString());
      res.redirect('/admin');
    }

    if (error) {
      req.session.sessionStore.msgfile = error.toString();
      console.log(error.toString());
      res.redirect('/admin');
    }
  } catch (err) {
    req.session.sessionStore.msgfile = error.toString();
    console.log(err);
    res.redirect('/admin');
  }

  next();
};
