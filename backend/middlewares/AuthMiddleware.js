const {verify} = require("jsonwebtoken");

const validateToken = (req, res, next) => {
    const accessToken = req.header("accessToken");
    
    if(!accessToken){
        return res.json({ error: "Usuário não logado" });
    }
    
    try {
        const validToken = verify(accessToken, "utfsecret");
        if (validToken) {
            return next();
        }
    } catch (err) {
        return res.json({error: err});
    }
};

module.exports = {validateToken};