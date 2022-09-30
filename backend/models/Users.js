module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        usuario_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cnpj: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return Users;
}