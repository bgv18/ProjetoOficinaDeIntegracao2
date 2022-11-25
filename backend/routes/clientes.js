const express = require("express");
const router = express.Router();
const {Clientes} = require("../models");
const {validateToken} = require("../middlewares/AuthMiddleware");

router.get("/", async (req, res) => {
    try {
        const listaClientes = await Clientes.findAll();
        res.json(listaClientes);
    } catch(err){
        res.status(400).send({error: "Erro ao carregar clientes"});
    }
});

router.get("/byId/:id", async (req, res) => {
    const id = req.params.id;
    const cliente = await Clientes.findByPk(id);
    res.json(cliente);
});

router.get("/byCpf/:cpf", async (req, res) => {
    const cpfOuCnpj = req.params.cpf;
    const cliente = await Clientes.findOne({where: {cpfOuCnpj: cpfOuCnpj}});
    res.json(cliente);
});

router.get("/byNome/:nome", async (req, res) => {
    const nome = req.params.nome;
    const cliente = await Clientes.findOne({where: {nome: nome}});
    res.json(cliente);
});

router.get("/byCidade/:cidade", async (req, res) => {
    const cidade = req.params.cidade;
    const cliente = await Clientes.findAll({where: {cidade: cidade}});
    res.json(cliente);
});

router.get("/byEstado/:estado", async (req, res) => {
    const estado = req.params.estado;
    const cliente = await Clientes.findAll({where: {estado: estado}});
    res.json(cliente);
});

router.get("/byPais/:pais", async (req, res) => {
    const pais = req.params.pais;
    const cliente = await Clientes.findAll({where: {pais: pais}});
    res.json(cliente);
});

router.post("/", validateToken, async (req, res) => {
    const cliente = req.body;
    await Clientes.create(cliente);
    res.json(cliente);
});

module.exports = router;