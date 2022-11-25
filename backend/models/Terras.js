module.exports = (sequelize, DataTypes) => {
    const Terras = sequelize.define("Terras", {
        terra: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cidade:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        cliente:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        condicao:{
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return Terras;
}