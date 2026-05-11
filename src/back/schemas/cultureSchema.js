const { z } = require('zod');

const cultureSchema = z.object({

    cultureName: z.string()
        .min(2)
        .max(100),

    plantingLocation: z.string()
        .min(2)
        .max(150),

    plantingDate: z.coerce.date(),

    plantedArea: z.number()
        .positive()

});

module.exports = cultureSchema;