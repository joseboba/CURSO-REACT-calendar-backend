const { Router } = require('express');
const { check } = require('express-validator');
const authController = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();


router.post(
    '/',
            [
                check('email', 'El email es obligatorio').isEmail(),
                check('password', 'El password debe de ser de 6 caracteres').isLength({min: 6}),
                validarCampos   
            ]
    ,authController.loginUsuario);


router.post(
    '/new', 
            [
                check('name', 'El nombre es obligatorio').not().isEmpty(),
                check('email', 'El email es obligatorio').isEmail(),
                check('password', 'El password debe de ser de 6 caracteres').isLength({min : 6}),
                validarCampos
            ]
    ,authController.crearUsuario);

router.get('/renew', validarJWT ,authController.revalidarToken);


module.exports = router;