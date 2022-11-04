const { request, response } = require("express");
const express = require("express");
const router = express.Router();
const {Clientes} = require("../models");

router.get("/Clientes", async (req, res) => {
    const listaClientes = await Clientes.findAll();
    res.json(listaClientes);
});

const getClienteById = (request, response) => {
    const id = parseInt(request.params.id);
    Clientes.query('Select * From Clientes where id = $1', [id], (error, results)=>{
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}
router.get("/clientes/:id", getClienteById);

const getClienteBycpfOuCnpj = (request, response) => {
    const cpfOuCnpj = parseInt(request.params.cpfOuCnpj);
    Clientes.query('Select * From Clientes where id = $1', [cpfOuCnpj], (error, results)=>{
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}
router.get("/clientes/:cpfOuCnpj", getClienteBycpfOuCnpj);

const getClienteByNome = (request, response) => {
    const nome = parseInt(request.params.nome);
    Clientes.query('Select * From Clientes where nome like %$1%', [nome], (error, results)=>{
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}
router.get("/clientes/:nome", getClienteByNome);

const getClienteByCidade = (request, response) => {
    const cidade = parseInt(request.params.cidade);
    Clientes.query('Select * From Clientes where cidade like %$1%', [cidade], (error, results)=>{
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}
router.get("/clientes/:cidade", getClienteByCidade);

const getClienteByEstado = (request, response) => {
    const estado = parseInt(request.params.estado);
    Clientes.query('Select * From Clientes where estado like %$1%', [estado], (error, results)=>{
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}
router.get("/clientes/:estado", getClienteByEstado);

router.post("/Clientes", async (req, res) => {
    const cliente = req.body;
    await Clientes.create(cliente);
    res.json(cliente);
});

module.exports = router;