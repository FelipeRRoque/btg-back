const validate = (schema) => (req, res, next) => {
  try {
    const parsedBody = schema.parse(req.body);
    req.body = parsedBody;
    return next();
  } catch (error) {
    const issues = error.issues || error.errors || [];

    return res.status(400).json({
      error: "Falha na validação dos dados",
      details: issues.map((err) => ({
        field: err.path?.[0] || "body",
        message: err.message,
      })),
    });
  }
};

module.exports = validate;