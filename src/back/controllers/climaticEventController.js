const climaticEventService = require('../services/climaticEventService');
const climaticEventSchema = require('../schemas/climaticEventSchema');

async function create(req, res) {

    try {

        const validatedData = climaticEventSchema.parse(req.body);

        const climaticEvent = await climaticEventService.createClimaticEvent(validatedData);

        return res.status(201).json(climaticEvent);

    } catch (error) {

        if (error.errors) {

            return res.status(400).json({
                errors: error.errors
            });
        }

        return res.status(500).json({
            message: error.message
        });
    }
}


async function getAll(req, res) {

    try {

        const climaticEvents = await climaticEventService.getAllClimaticEvents();

        return res.status(200).json(climaticEvents);

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });
    }
}

async function getById(req, res) {

    try {

        const { id } = req.params;

        const climaticEvent = await climaticEventService.getClimaticEventById(id);

        if (!climaticEvent) {
            return res.status(404).json({
                message: 'Climatic event not found'
            });
        }

        return res.status(200).json(climaticEvent);

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });
    }
}

async function update(req, res) {

    try {

        const { id } = req.params;

        const validatedData = climaticEventSchema.parse(req.body);

        const updatedClimaticEvent =
            await climaticEventService.updateClimaticEvent(id, validatedData);

        if (!updatedClimaticEvent) {

            return res.status(404).json({
                message: 'Climatic event not found'
            });
        }

        return res.status(200).json(updatedClimaticEvent);

    } catch (error) {

        if (error.errors) {

            return res.status(400).json({
                errors: error.errors
            });
        }

        return res.status(500).json({
            message: error.message
        });
    }
}

async function remove(req, res) {

    try {

        const { id } = req.params;

        const deleted =
            await climaticEventService.deleteClimaticEvent(id);

        if (!deleted) {

            return res.status(404).json({
                message: 'Climatic event not found'
            });
        }

        return res.status(200).json({
            message: 'Climatic event deleted successfully'
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });
    }
}

module.exports = {
    create,
    getAll,
    getById,
    update,
    remove
};