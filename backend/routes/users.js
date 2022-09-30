const express = require("express");
const router = express.Router();
const {Users} = require("../models");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
    const cadastro = req.body;
    bcrypt.hash(cadastro.senha, 10).then((hash) => {
        Users.create({
            usuario_id: cadastro.usuario_id,
            nome: cadastro.nome,
            cnpj: cadastro.cnpj,
            email: cadastro.email,
            senha: hash,
        });
        res.json("Sucesso");
    });
});

router.post("/login", async (req, res) => {
    const login = req.body;
    const user = await Users.findOne({where: {usuario_id: login.usuario_id}});
    if(!user){
        res.json("Usuário não existe");
    } else {
        bcrypt.compare(login.senha, user.senha).then((match) => {
            if(!match){
                res.json({error: "Usário e/ou senha incorreto(s)"});
            } else {
                res.json("Você se logou");
            }
        });
    }
});

module.exports = router;