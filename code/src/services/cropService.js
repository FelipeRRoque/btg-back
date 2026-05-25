const { Crop } = require("../models");

class CropService {
  static async create(data) {
    const crop = await Crop.create({
      name: data.name,
      scientific_name: data.scientific_name,
      technical_info: data.technical_info
    });
    return crop;
  }

  static async findAll() {
    return await Crop.findAll();
  }

  static async findById(id) {
    const crop = await Crop.findByPk(id);
    if (!crop) {
      throw new Error("Cultura não encontrada");
    }
    return crop;
  }
}

module.exports = CropService;