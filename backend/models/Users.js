module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        nome: {
            type: DataTypes.STRING,
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