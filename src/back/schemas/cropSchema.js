const { z } = require("zod");

const cropCreateSchema = z.object({
  name: z.string().min(2, "O nome da cultura deve ter no mínimo 2 caracteres"),
  scientific_name: z.string().optional(),
  technical_info: z.string().optional(),
});

module.exports = { cropCreateSchema };