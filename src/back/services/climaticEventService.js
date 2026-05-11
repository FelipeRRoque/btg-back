const { ClimaticEvent, Culture } = require('../models');

async function createClimaticEvent(data) {

    const climaticEvent = await ClimaticEvent.create(data);

    return climaticEvent;
}

async function getAllClimaticEvents() {

    const climaticEvents = await ClimaticEvent.findAll({
        include: [
            {
                model: Culture,
                as: 'culture'
            }
        ]
    });

    return climaticEvents;
}

async function getClimaticEventById(id) {

    const climaticEvent = await ClimaticEvent.findByPk(id, {
        include: [
            {
                model: Culture,
                as: 'culture'
            }
        ]
    });

    return climaticEvent;
}

async function updateClimaticEvent(id, data) {

    const climaticEvent = await ClimaticEvent.findByPk(id);

    if (!climaticEvent) {
        return null;
    }

    await climaticEvent.update(data);

    return climaticEvent;
}

async function deleteClimaticEvent(id) {

    const climaticEvent = await ClimaticEvent.findByPk(id);

    if (!climaticEvent) {
        return null;
    }

    await climaticEvent.destroy();

    return true;
}

module.exports = {
    createClimaticEvent,
    getAllClimaticEvents,
    getClimaticEventById,
    updateClimaticEvent,
    deleteClimaticEvent
};