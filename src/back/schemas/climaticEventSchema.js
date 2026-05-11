const { z } = require('zod');

const climaticEventSchema = z.object({

    cultureId: z.number().int(),

    eventType: z.string()
        .min(2)
        .max(100),

    eventDate: z.coerce.date(),

    intensity: z.string()
        .max(50)
        .optional(),

    description: z.string()
        .max(500)
        .optional()

});

module.exports = climaticEventSchema;