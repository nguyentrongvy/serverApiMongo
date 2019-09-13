const Joi = require('joi');

module.exports = {
  validateBody: (schema) => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema, {abortEarly: false});
      if (result.error) {
        return res.status(400).json(result.error.details);
      }

      if (!req.value) { req.value = {}; }
      req.value['body'] = result.value;
      next();
    }
  },

  schemas: {
    authSchema: Joi.object().keys({
      title: Joi.string().required().min(3),
      content: Joi.string().required(),
      author: Joi.any().allow()
    })
  }
}