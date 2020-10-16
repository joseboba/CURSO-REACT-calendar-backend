const { Router } = require('express');
const { check } = require('express-validator')
const router = Router();

const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events.controller');
const {validarCampos} = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

// Todas las rutas tienen que pasar por la validacion del JWT
router.use( validarJWT )

router.post(
            '/',
                [
                    check('title', 'El titulo es necesario').notEmpty(),
                    check('start', 'La fecha de inicio es necesario').isDate().notEmpty(),
                    check('end', 'La fecha de finalizacion es necesario').isDate().notEmpty(),
                    validarCampos
                ]
            ,crearEvento);


router.get('/', getEventos);
router.put(
            '/:id',
            [
                check('title', 'El titulo es necesario').notEmpty(),
                check('start', 'La fecha de inicio es necesario').isDate().notEmpty(),
                check('end', 'La fecha de finalizacion es necesario').isDate().notEmpty(),
                validarCampos
            ]
        ,actualizarEvento);
router.delete('/:id',  eliminarEvento);

module.exports = router;