const CropService = require("../services/cropService");

class CropController {
  static async create(req, res) {
    try {
      const crop = await CropService.create(req.body);
      return res.status(201).json(crop);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async findAll(req, res) {
    try {
      const crops = await CropService.findAll();
      return res.json(crops);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async findById(req, res) {
    try {
      const { id } = req.params;
      const crop = await CropService.findById(id);
      return res.json(crop);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }
}

module.exports = CropController;