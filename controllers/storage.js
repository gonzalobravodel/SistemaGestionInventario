//Llamar al modelo 
const fs = require("fs");
const { matchedData } = require("express-validator");
const { storageModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");
const { isValidObjectId } = require("mongoose");

const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;

/**
 * Obtener lista de la base de datos
*@param {*} req
*@param {*} res
*/
const getItems = async (req, res) => {
    try {
        const data = await storageModel.find({});
        res.send({ data });
    } catch (error) {
      handleHttpError(res,500);
    }
};

/**
* Obtener un detalle
* @param {*} req
* @param {*} res
*/
const getItem = async (req, res) => {
    try{
        const {id} = req.params;
        const data = await storageModel.findById({_id: id});
        res.send({ data });
    }catch(e){
      handleHttpError(res,500);
    }
};

/**
* Insertar un registro
* @param {*} req
* @param {*} res
*/
const createItem = async (req, res) => {
    try {
      const { file } = req;
      const fileData = {
        filename: file.filename,
        url: `${PUBLIC_URL}/${file.filename}`,
      };
      const data = await storageModel.create(fileData);
      res.status(201);
      res.send({ data });
    } catch (e) {
      handleHttpError(res, 500);
      console.log(e)
    }
};

/**
* Eliminar un registro 
* @param {*} req
* @param {*} res
*/
const deleteItem = async (req, res) => {
  try {
      const { id } = req.params;
      // Verifica si el _id es válido (por ejemplo, si es un ID de MongoDB)
      if (!isValidObjectId(id)) {
        return handleHttpError(res, 400); // Código de estado 400 para solicitud incorrecta
      }
      const dataFile = await storageModel.findById(id);
      const deleteResponse = await storageModel.findByIdAndDelete(id);
      const {filename} = dataFile;
      const filePath = `${MEDIA_PATH}/${filename}`;

      if (!deleteResponse) {
        return handleHttpError(res, 404); // Código de estado 404 si no se encontró el elemento
      }

      const data = {
        filePath,
        deleted: 1 // En este caso, asumimos que siempre se eliminará un elemento
      };
      

      res.send({ data });
  } catch (e) {
      console.error(e);
      handleHttpError(res, 500); // Código de estado 500 para error interno del servidor
  }
};

module.exports = {getItems, getItem, createItem, deleteItem};