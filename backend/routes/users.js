const express = require("express");
const router = express.Router();
const {Users} = require("../models");
const bcrypt = require("bcrypt");
const {sign} = require("jsonwebtoken");

router.post("/", async (req, res) => {
    const cadastro = req.body;
    const user = await Users.findOne({where: {email: cadastro.email}});
    if(user){
        res.json("E-mail já usado");
    } else {
        bcrypt.hash(cadastro.senha, 10).then((hash) => {
            Users.create({
                nome: cadastro.nome,
                email: cadastro.email,
                senha: hash,
            });
            res.json("Sucesso");
        });
    }
});

router.post("/login", async (req, res) => {
    const login = req.body;
    const user = await Users.findOne({where: {email: login.email}});
    if(!user){
        res.json("Usuário não existe");
    } else {
        bcrypt.compare(login.senha, user.senha).then((match) => {
            if(!match){
                res.json({error: "Usário e/ou senha incorreto(s)"});
            } else {
                const accessToken = sign({
                    nome: user.nome, id: user.id}, "utfsecret"
                );
                
                res.json(accessToken);
            }
        });
    }
});

module.exports = router;