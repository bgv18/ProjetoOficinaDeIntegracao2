module.exports = (sequelize, DataTypes) => {
    const usuario = sequelize.define("Users", {
        usuario_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cnpj: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false
        },
    })
}