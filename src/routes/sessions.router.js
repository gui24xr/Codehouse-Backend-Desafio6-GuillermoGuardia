import express from 'express'
import { UserModel } from '../models/user.models.js'

export const router = express.Router()

router.get('/session',(req,res)=>{
    res.send('Hola')
})

router.get('/registrarse',async(req,res)=>{
    res.render('register')
})

router.post('/registrarse',async(req,res)=>{
    //Recibo los datos del nuevo usuario.
    const {first_name,last_name,age,email,password} = req.body
    try{
        //Como en mongo el email es unico si hay un email igual rebota el nuevo user.
        await UserModel.create({first_name,last_name,age,email,password})
        res.status(400).send({message:'Usuario creado con exito...'})

    }catch(error){
        res.status(400).send({error:'Error al crear el usuario...'})
    }
})

router.get('/login',(req,res)=>{
    res.render('login')
})

router.post('/login',async(req,res)=>{
    const {email,password} = req.body
    //Comprueno que exista en la BD un user con el email
    try {
        const usuario = await UserModel.findOne({email:email})
        if(usuario){
            //Chequeo el password.
            usuario.password == password 
            ?
            (
                req.session.login = true,
                req.session.data = usuario, //Le pongo una propiedad alobjeto req.session que sea un objeto con la data de usuario
                
                //res.status(200).send({message:'Usuario inicio sesion con exito!!'})
                res.redirect('/products')
            ):
            (
                res.status(400).send({error:'Contraseña no valida...'})
            )
           }
        else{
            res.status(400).send({error:'El usuario no existe...'})
        }
    } catch (error) {
        res.status(400).send({error:'Error del servidor...'})
    }
})

router.get('/logout',(req,res)=>{
    if ( req.session.login ){
        req.session.destroy()
    }
    res.status(200).send('Se ah eliminado el login...')
})