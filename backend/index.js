const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");

const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);
const clientesRouter = require("./routes/clientes");
app.use("/clientes", clientesRouter);
const terrasRouter = require("./routes/terras");
app.use("/terras", terrasRouter);

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Servidor rodando na porta 3001");
    });
});