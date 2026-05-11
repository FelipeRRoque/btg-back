const { Culture, ClimaticEvent } = require('../models');

async function createCulture(data) {

    const culture = await Culture.create(data);

    return culture;
}

async function getAllCultures() {

    const cultures = await Culture.findAll({
        include: [
            {
                model: ClimaticEvent,
                as: 'climaticEvents'
            }
        ]
    });

    return cultures;
}

async function getCultureById(id) {

    const culture = await Culture.findByPk(id, {
        include: [
            {
                model: ClimaticEvent,
                as: 'climaticEvents'
            }
        ]
    });

    return culture;
}

async function updateCulture(id, data) {

    const culture = await Culture.findByPk(id);

    if (!culture) {
        return null;
    }

    await culture.update(data);

    return culture;
}

async function deleteCulture(id) {

    const culture = await Culture.findByPk(id);

    if (!culture) {
        return null;
    }

    await culture.destroy();

    return true;
}

module.exports = {
    createCulture,
    getAllCultures,
    getCultureById,
    updateCulture,
    deleteCulture
};