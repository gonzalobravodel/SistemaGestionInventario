const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/session");
const checkRol = require("../middleware/rol");
const {validatorCreateItem, validatorGetItem, validatorUpdateItem} = require("../validators/almacen");
const { getItems, getItem, deleteItem, createItem, updateItem } = require("../controllers/almacen");

//Es importante que el checkRol esté despuñes de authMiddleware, porque necesita que el auth exista para poder comprobarlo


router.get("/", authMiddleware,  getItems); //Lista los items

router.get("/:id", authMiddleware, validatorGetItem, getItem); //Obtiene el detalle de un item

router.post("/", authMiddleware, checkRol(["admin", "user"]), validatorCreateItem, createItem); //Crea items solo para usuarios con rol de admin

router.delete("/:id", authMiddleware, deleteItem);//Elimina un item por id

router.put("/:id", authMiddleware, validatorUpdateItem, updateItem); // Actualiza items


module.exports=router;