const { Op } = require("sequelize");
const PropertyService = require("../services/propertyService");
const ClimateService = require("../services/climateService");
const { PlantingRecord, PlantingArea, Property, Crop } = require("../models");

class CropHistoryController {
  static async findHistoryById(req, res) {
    try {
      const { id } = req.params;
      const crop = await Crop.findByPk(id);

      if (!crop) {
        return res.status(404).json({ error: "Cultura não encontrada." });
      }

      const properties = await PropertyService.findPropertiesByUser(req.user.id);

      if (!properties || properties.length === 0) {
        return res.status(404).json({
          error:
            "Nenhuma propriedade encontrada para este usuário. Não é possível calcular o histórico climático.",
        });
      }

      const selectedProperty = properties[0];
      const climateHistory = await ClimateService.getHistoricalData(selectedProperty);

      return res.json({
        crop: {
          id: crop.id,
          name: crop.name,
          scientific_name: crop.scientific_name,
          technical_info: crop.technical_info,
        },
        property: {
          name: selectedProperty.name,
          location: {
            lat: selectedProperty.latitude,
            lon: selectedProperty.longitude,
          },
        },
        climate_history: climateHistory,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async findAreaHistory(req, res) {
    try {
      const { id } = req.params;

      const area = await PropertyService.findPlantingAreaById(req.user.id, id);
      const property = area.property;

      const plantingRecords = await PlantingRecord.findAll({
        where: {
          planting_area_id: area.id,
        },
        include: [
          {
            model: Crop,
            as: "crop",
            required: false,
          },
        ],
        order: [
          ["plant_date", "DESC"],
          ["created_at", "DESC"],
        ],
      });

      let climateHistory = null;

      if (property?.latitude != null && property?.longitude != null) {
        climateHistory = await ClimateService.getRecentHistoricalData(property, {
          days: 15,
        });
      }

      return res.json({
        area,
        property,
        planting_records: plantingRecords,
        climate_history: climateHistory,
      });
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  static async createAreaHistory(req, res) {
    try {
      const { id } = req.params;
      const {
        type,
        crop_id,
        plant_date,
        event_date,
        expected_harvest_date,
        actual_harvest_date,
        status,
        notes,
      } = req.body;

      await PropertyService.findPlantingAreaById(req.user.id, id);

      const normalizedType = String(type || "plantio").toLowerCase();
      const isClimateEvent = normalizedType === "clima" || normalizedType === "evento_climatico";
      const recordDate = plant_date || event_date;

      if (!recordDate) {
        return res.status(400).json({
          error: "Informe a data do registro.",
        });
      }

      if (!status || String(status).trim().length < 2) {
        return res.status(400).json({
          error: "Informe o status ou título do registro.",
        });
      }

      if (!isClimateEvent && !crop_id) {
        return res.status(400).json({
          error: "Informe a cultura plantada para registros de plantio.",
        });
      }

      if (crop_id) {
        const crop = await Crop.findByPk(crop_id);

        if (!crop) {
          return res.status(404).json({ error: "Cultura não encontrada." });
        }
      }

      const record = await PlantingRecord.create({
        planting_area_id: id,
        crop_id: isClimateEvent ? null : crop_id,
        plant_date: recordDate,
        expected_harvest_date: isClimateEvent ? null : expected_harvest_date || null,
        actual_harvest_date: isClimateEvent ? null : actual_harvest_date || null,
        status: isClimateEvent
          ? `EVENTO_CLIMATICO: ${String(status).trim()}`
          : String(status).trim(),
        notes: notes || null,
      });

      const createdRecord = await PlantingRecord.findByPk(record.id, {
        include: [
          {
            model: Crop,
            as: "crop",
            required: false,
          },
        ],
      });

      return res.status(201).json(createdRecord);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async deleteAreaHistoryRecord(req, res) {
    try {
      const { areaId, recordId } = req.params;

      await PropertyService.findPlantingAreaById(req.user.id, areaId);

      const record = await PlantingRecord.findOne({
        where: {
          id: recordId,
          planting_area_id: areaId,
        },
      });

      if (!record) {
        return res.status(404).json({
          error: "Registro de histórico não encontrado.",
        });
      }

      await record.destroy();

      return res.json({ message: "Registro excluído com sucesso." });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = CropHistoryController;
