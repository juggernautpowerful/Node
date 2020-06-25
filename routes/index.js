const express = require('express');
const router = express.Router();
const validator = require('../libs/validation');

const controllerlHome = require('../controllers/indexController');
const controllerlLogin = require('../controllers/loginController');
const controllerAdmin = require('../controllers/adminController');

router.get('/', controllerlHome.get);
router.post('/', controllerlHome.email);

router.get('/login', controllerlLogin.get);
router.post('/login', validator.loginValidation, controllerlLogin.post);

router.get('/admin', controllerAdmin.get);
 router.post('/admin/skills', validator.skillsValidation, controllerAdmin.postSkills);
 router.post('/admin/upload', validator.productsValidation, controllerAdmin.postProducts);


module.exports = router;
