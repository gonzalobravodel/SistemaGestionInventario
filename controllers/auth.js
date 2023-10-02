const { matchedData } = require("express-validator");
const {encrypt, compare} = require("../utils/handlePassword")
const {usersModel} = require("../models")
const {tokenSign} = require("../utils/handleJwt");
const { handleHttpError } = require("../utils/handleError");

/**
* Este controlador es el encargado de registrar un usuario
* @param {*} req
* @param {*} res
*/

const registerCtrl = async (req, res) => {
    try{
        req = matchedData(req); //cura la data
        const password=  await encrypt(req.password);
        const body = {...req, password}; //creamos un objeto body a partir del req y sobreescribe el password con el hash

        const existinguser = await usersModel.findOne({
            where: {
            email: req.email
            }
        });

        if(existinguser){
            handleHttpError(res, 409);
            return
        }

        const dataUser = await usersModel.create(body);

        

        dataUser.set("password", undefined, {strict: false}); //oculta el password de la data
        const data = {
            token: await tokenSign(dataUser),
            user: dataUser,
        };
        res.status(201);
        res.send({data});
    }catch(e){
        console.log('error', e );
        handleHttpError(res, 500);
        return
    }
}

/** 
* Este controlador es el encargado de loguear un usuario
* @param {*} req
* @param {*} res
*/


const loginCtrl = async (req, res) => {
    try{
        req = matchedData(req); //cura la data
        const user = await usersModel.findOne({
            where: {
                email: req.email
            }
        }); //hay que aplicar el filtro de select para elegir los campos que queremos que devuelva
        if(!user){
            handleHttpError(res, 404)
            
            return //ponemos el return para indicar a la función que termine ahí
        }

        const hashPassword = user.get('password');
        const check = await compare(req.password, hashPassword) //devuelve true o false

        if(!check){
            handleHttpError(res, 401)
            return
        }

        user.set('password', undefined, {strict: false}) //con esto le decimos que ponga la pw como undefined y no la muestre en el json de salida de la api
        const data = {
            token: await tokenSign(user),
            user
        }

        res.send({data})
    }catch(e){
        handleHttpError(res, 500)
        return
    }

}

module.exports = { registerCtrl, loginCtrl};