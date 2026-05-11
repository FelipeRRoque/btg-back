const { z } = require("zod");
const { USER_ROLES } = require("../utils/constants");
const userCreateSchema = z.object({
  name: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
  email: z.string().email("Formato de e-mail inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  role: z.enum([USER_ROLES.PRODUCER, USER_ROLES.AGRONOMIST], {
    errorMap: () => ({ message: "Cargo inválido ou não permitido" }),
  }),
  age: z.number().min(18, "Apenas maiores de 18 anos").optional(),
  education_level: z.string().optional(),
  gender: z.string().optional(),
});

module.exports = { userCreateSchema };
