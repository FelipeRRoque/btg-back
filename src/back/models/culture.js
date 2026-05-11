module.exports = (sequelize, DataTypes) => {

    const Culture = sequelize.define('Culture', {

        cultureName: {
            type: DataTypes.STRING,
            allowNull: false
        },

        plantingLocation: {
            type: DataTypes.STRING,
            allowNull: false
        },

        plantingDate: {
            type: DataTypes.DATE,
            allowNull: false
        },

        plantedArea: {
            type: DataTypes.FLOAT,
            allowNull: false
        }

    });

    Culture.associate = (models) => {

        Culture.hasMany(models.ClimaticEvent, {
            foreignKey: 'cultureId',
            as: 'climaticEvents'
        });

    };

    return Culture;
};