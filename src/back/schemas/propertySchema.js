const { z } = require("zod");

const propertyCreateSchema = z.object({
  name: z.string().min(3, "O nome da propriedade deve ter no mínimo 3 caracteres"),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  city: z.string().min(2, "Informe a cidade").optional(),
  state: z.string().length(2, "O estado deve ter exatas 2 letras (ex: MG)").optional(),
});

const propertyUpdateSchema = propertyCreateSchema.partial();

const plantingAreaCreateSchema = z.object({
  property_id: z.string().uuid("ID da propriedade inválido"),
  name: z.string().min(3, "O nome da área deve ter no mínimo 3 caracteres"),
  size_hectares: z.number().positive("O tamanho em hectares deve ser maior que zero").optional(),
  soil_type: z.string().optional(),
});

const plantingAreaUpdateSchema = plantingAreaCreateSchema.partial();

module.exports = {
  propertyCreateSchema,
  propertyUpdateSchema,
  plantingAreaCreateSchema,
  plantingAreaUpdateSchema,
};