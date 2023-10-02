const { matchedData } = require("express-validator");
const { almacenModel } = require('../models/index');
const { handleHttpError } = require("../utils/handleError");
const { isValidObjectId } = require("mongoose");

const getItems = async (req, res) => {
    try {
        const user = req.user;
        const data = await almacenModel.find({});
        res.send({ data, user });
    } catch (error) {
        console.error(error);
        handleHttpError(res, 404); // Error interno del servidor
    }
};

const getItem = async (req, res) => {
    try{
      req = matchedData(req);
      const {id} = req;
      const data = await almacenModel.findOneData(id);
      res.send({ data });
    }catch(e){
        console.error(e);
      handleHttpError(res,404);
    }
};

const createItem = async (req, res) => {
    try {
      const body = matchedData(req);
      const data = await almacenModel.create(body);
      res.status(201);
      res.send({ data });
    } catch (e) {
        console.error(e);
      handleHttpError(res, 500);
      throw e;
    }
};


const updateItem = async (req, res) => {
    try {
        const {_id, ...body} = matchedData(req);
        const data = await almacenModel.findByIdAndUpdate(_id, body);
        res.send({ data });
    } catch (e) {
        console.error(e);
      handleHttpError(res, 500);
      
    }
};


const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        // Verifica si el _id es válido (por ejemplo, si es un ID de MongoDB)
        if (!isValidObjectId(id)) {
            
            return handleHttpError(res, 400); // Código de estado 400 para solicitud incorrecta
        }
       
        const deleteResponse = await almacenModel.findByIdAndDelete(id);

        if (!deleteResponse) {
            return handleHttpError(res, 404); // Código de estado 404 si no se encontró el elemento
        }

        const data = {
            deleted: 1 // En este caso, asumimos que siempre se eliminará un elemento
        };
        

        res.send({ data });
    } catch (e) {
        console.error(e);
        handleHttpError(res, 500); // Código de estado 500 para error interno del servidor
    }
};


module.exports = { getItems, getItem, createItem, updateItem, deleteItem };
