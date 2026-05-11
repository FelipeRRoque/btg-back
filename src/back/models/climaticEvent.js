module.exports = (sequelize, DataTypes) => {

    const ClimaticEvent = sequelize.define('ClimaticEvent', {

        cultureId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        eventType: {
            type: DataTypes.STRING,
            allowNull: false
        },

        eventDate: {
            type: DataTypes.DATE,
            allowNull: false
        },

        intensity: {
            type: DataTypes.STRING
        },

        description: {
            type: DataTypes.TEXT
        }

    });

    ClimaticEvent.associate = (models) => {

        ClimaticEvent.belongsTo(models.Culture, {
            foreignKey: 'cultureId',
            as: 'culture'
        });

    };

    return ClimaticEvent;
};