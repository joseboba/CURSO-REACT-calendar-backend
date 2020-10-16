const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt')
const Usuario = require('../models/Usuario.model');

const crearUsuario = async(req, res = response) => {

    const { email, password } = req.body;
    
    try{
        let usuario = await Usuario.findOne({ email });
       
        if(usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe con ese correo'
            })
        }
    
        usuario = new Usuario(req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt);

        await usuario.save();

        //Generar Token
        const token = await generarJWT(usuario.id, usuario.name)

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        }) 
    }catch(err){
        console.log(err)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
        
}

const loginUsuario = async(req, res = response) => {

    const { email, password } = req.body;

    try{
        let usuario = await Usuario.findOne({ email });

        if(!usuario){
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe en la base de datos'
            })
        }

        const validPassword = bcrypt.compareSync( password, usuario.password )

        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            })
        }

        //Generar el token
        const token = await generarJWT( usuario.id, usuario.name )

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const revalidarToken = async(req, res = response) => {

    const uid = req.uid;
    const name = req.name;

    const token = await generarJWT( uid, name )

    res.json({
        ok: true,
        uid,
        name,
        token
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}