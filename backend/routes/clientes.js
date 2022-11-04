const express = require("express");
const router = express.Router();
const {Clientes} = require("../models");

router.get("/", async (req, res) => {
    const listaClientes = await Clientes.findAll();
    res.json(listaClientes);
});

router.post("/", async (req, res) => {
    const cliente = req.body;
    await Clientes.create(cliente);
    res.json(cliente);
});

module.exports = router;