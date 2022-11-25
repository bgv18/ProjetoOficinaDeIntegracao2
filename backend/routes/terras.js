const express = require("express");
const router = express.Router();
const {Terras} = require("../models");
const {Clientes} = require("../models");
const {validateToken} = require("../middlewares/AuthMiddleware");

router.post("/", async (req, res) => {
    const terra = req.body;
    const cidade = terra.cidade;
    const cliente = terra.cliente;
    const cidadeTerra = await Clientes.findOne({where: {cidade : cidade}});
    const clienteDono = await Clientes.findOne({where: {nome : cliente}});
    if(cidadeTerra == null || clienteDono == null){
        switch (cidadeTerra, clienteDono){
            case (cidadeTerra == null) && (clienteDono == null) :
                res.json("A cidade e o cliente não existem");
                break;
            case (cidadeTerra == null) :
                res.json("A cidade não existe");
                break;
            case (clienteDono == null) :
                res.json("O cliente não existe");
                break;
            default :
                res.json("Erro");
        }
    } else {
        await Terras.create(terra);
    }
});

router.get("/", async (req, res) => {
    try {
        const listaTerras = await Terras.findAll();
        res.json(listaTerras);
    } catch(err){
        res.status(400).send({error: "Erro ao carregar terras"});
    }
});

router.post("/byId/:id", async (req, res) => {
    const id = req.params.id;
    const terra = await Terras.findByPk(id);
    res.json(terra);
});

router.post("/byCidade/:cidade", async (req, res) => {
    const cidade = req.params.cidade;
    const terra = await Terras.findAll({where: {cidade: cidade}});
    res.json(terra);
});

router.post("/byCliente/:cliente", async (req, res) => {
    const cliente = req.params.cliente;
    const terra = await Terras.findAll({where: {cliente: cliente}});
    res.json(terra);
});

router.post("/byCondicao/:condicao", async (req, res) => {
    const condicao = req.params.condicao;
    const terra = await Terras.findAll({where: {condicao: condicao}});
    res.json(terra);
});

router.put("/atualizarTerra/:id", validateToken, async (req, res) => {
    const id = req.params.id;
    const terra = req.body;
    const cidade = terra.cidade;
    const cliente = terra.cliente;
    const cidadeTerra = await Clientes.findOne({where: {cidade : cidade}});
    const clienteDono = await Clientes.findOne({where: {nome : cliente}});
    if(cidadeTerra == null || clienteDono == null){
        switch (cidadeTerra, clienteDono){
            case (cidadeTerra == null) && (clienteDono == null) :
                res.json("A cidade e o cliente não existem");
                break;
            case (cidadeTerra == null) :
                res.json("A cidade não existe");
                break;
            case (clienteDono == null) :
                res.json("O cliente não existe");
                break;
            default :
                res.json("Erro");
        }
    } else {
        var atualizacao = await Terras.update(terra, {where: {id: id}});
        res.json(atualizacao);
    }
});

router.delete("/deletaTerra/:id", async (req, res) => {
    const id = req.params.id;
    await Terras.destroy({where : {id: id}});
    res.json("Deleção realizada com sucesso");
});

module.exports = router;