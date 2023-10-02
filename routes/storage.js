
const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage");
const authMiddleware = require("../middleware/session")
const {validatorGetItem} = require("../validators/storage")
const {getItems, createItem, getItem, deleteItem} = require("../controllers/storage")
//TODO http://localhost:2001/api/storage


router.get("/", authMiddleware, getItems) //http://localhost:2001/api/storage/items


router.post("/", uploadMiddleware.single("myfile"), createItem);


router.get("/:id", validatorGetItem, getItem); //obtener item


router.delete('/:id' ,  deleteItem);//http://localhost:2001/api/


// router.post('/:id', uploadFile); // http://localhost:2001/api/upload

module.exports = router;