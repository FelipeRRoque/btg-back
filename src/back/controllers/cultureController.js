const cultureService = require('../services/cultureService');
const cultureSchema = require('../schemas/cultureSchema');

async function create(req, res) {

    try {

        const validatedData = cultureSchema.parse(req.body);

        const culture = await cultureService.createCulture(validatedData);

        return res.status(201).json(culture);

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });
    }
}

async function getAll(req, res) {

    try {

        const cultures = await cultureService.getAllCultures();

        return res.status(200).json(cultures);

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });
    }
}

async function getById(req, res) {

    try {

        const { id } = req.params;

        const culture = await cultureService.getCultureById(id);

        if (!culture) {
            return res.status(404).json({
                message: 'Culture not found'
            });
        }

        return res.status(200).json(culture);

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });
    }
}

async function update(req, res) {

    try {

        const { id } = req.params;

        const validatedData = cultureSchema.parse(req.body);

        const updatedCulture = await cultureService.updateCulture(id, validatedData);

        if (!updatedCulture) {

            return res.status(404).json({
                message: 'Culture not found'
            });
        }

        return res.status(200).json(updatedCulture);

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

        const deleted = await cultureService.deleteCulture(id);

        if (!deleted) {

            return res.status(404).json({
                message: 'Culture not found'
            });
        }

        return res.status(200).json({
            message: 'Culture deleted successfully'
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