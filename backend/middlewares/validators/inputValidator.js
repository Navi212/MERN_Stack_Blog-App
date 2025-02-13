/* eslint-disable prettier/prettier */
// Validates inputs Category
const joi = require('joi');
const { AppError } = require('../../services/errorHandler');
const { nameDescriptionRegx, contentAreaRegx, passwordRegex } = require("../../services/regex");

const userSchema = joi.object({
  firstName: joi
    .string()
    .min(3)
    .max(50)
    .pattern(nameDescriptionRegx)
    .messages({
      'string.pattern.base':
        'firstName can only contain letters.',
    })
    .required(),
  
  lastName: joi
    .string()
    .min(3)
    .max(50)
    .pattern(nameDescriptionRegx)
    .messages({
      'string.pattern.base':
      'lastName can only contain letters.',
    })
    .required(),

  email: joi
    .string()
    .email()
    .required(),

  password: joi
    .string()
    .pattern(passwordRegex)
    .messages({
      'string.pattern.base':
      'password can contain a mix of allowed letters AlphaNumeric, Symbols.',
    })
    .required(),

  phone: joi
    .number()
    .integer()
    .required(),

  country: joi
    .string()
    .min(3)
    .max(50)
    .pattern(contentAreaRegx)
    .messages({
      'string.pattern.base':
      'country can only contain letters.',
    })
    .required(),

  state: joi
    .string()
    .min(3)
    .max(50)
    .pattern(contentAreaRegx)
    .messages({
      'string.pattern.base':
      'state can only contain letters.',
    })
    .required(),

  address: joi
    .string()
    .min(3)
    .max(50)
    .pattern(contentAreaRegx)
    .messages({
      'string.pattern.base':
      'address can only contain letters.',
    })
    .required()
})

const categorySchema = joi.object({
  name: joi
    .string()
    .min(3)
    .max(50)
    .pattern(nameDescriptionRegx)
    .messages({
      'string.pattern.base': 'Name can only contain letters and/or numbers.',
    })
    .required(),

  description: joi
    .string()
    .min(3)
    .max(100)
    .pattern(nameDescriptionRegx)
    .messages({
      'string.pattern.base':
        'Description can only contain letters and/or numbers.',
    })
    .required(),
});

const blogSchema = joi.object({
  name: joi
    .string()
    .min(3)
    .max(50)
    .pattern(nameDescriptionRegx)
    .messages({
      'string.pattern.base': 'Name can only contain letters and/or numbers.',
    })
    .required(),
  description: joi
    .string()
    .min(3)
    .max(100)
    .pattern(nameDescriptionRegx)
    .messages({
      'string.pattern.base':
        'Description can only contain letters and/or numbers.',
    })
    .required(),
  title: joi
    .string()
    .min(3)
    .max(100)
    .pattern(nameDescriptionRegx)
    .messages({
      'string.pattern.base': 'Title can only contain letters and/or numbers.',
    })
    .required(),
  content: joi
    .string()
    .min(50)
    .pattern(contentAreaRegx)
    .messages({
      'string.pattern.base': 'Content can only contain letters and/or numbers.',
    })
    .required(),
});

const commentSchema = joi.object({
  comment: joi
    .string()
    .min(3)
    .max(500)
    .pattern(contentAreaRegx)
    .messages({
      'string.pattern.base': 'Comment can only contain letters and/or numbers.',
    })
    .required(),
});

const courseSchema = joi.object({
  name: joi
    .string()
    .min(3)
    .max(50)
    .pattern(nameDescriptionRegx)
    .messages({
      'string.pattern.base': 'Name can only contain letters and/or numbers.',
    })
    .required(),
  description: joi
    .string()
    .min(3)
    .max(100)
    .pattern(nameDescriptionRegx)
    .messages({
      'string.pattern.base':
        'Description can only contain letters and/or numbers.',
    })
    .required(),
});

const courseTopicSchema = joi.object({
  name: joi
    .string()
    .min(3)
    .max(50)
    .pattern(nameDescriptionRegx)
    .messages({
      'string.pattern.base': 'Name can only contain letters and/or numbers.',
    })
    .required(),
  description: joi
    .string()
    .min(3)
    .max(100)
    .pattern(nameDescriptionRegx)
    .messages({
      'string.pattern.base':
        'Description can only contain letters and/or numbers.',
    })
    .required(),
  content: joi
    .string()
    .min(50)
    .pattern(contentAreaRegx)
    .messages({
      'string.pattern.base': 'Content can only contain letters and/or numbers.',
    })
    .required(),
});

const dsaSchema = joi.object({
  name: joi
    .string()
    .min(3)
    .max(50)
    .pattern(nameDescriptionRegx)
    .messages({
      'string.pattern.base': 'Name can only contain letters and/or numbers.',
    })
    .required(),
  description: joi
    .string()
    .min(3)
    .max(100)
    .pattern(nameDescriptionRegx)
    .messages({
      'string.pattern.base':
        'Description can only contain letters and/or numbers.',
    })
    .required(),
});

const dsaTopicSchema = joi.object({
  name: joi
    .string()
    .min(3)
    .max(50)
    .pattern(nameDescriptionRegx)
    .messages({
      'string.pattern.base': 'Name can only contain letters and/or numbers.',
    })
    .required(),
  description: joi
    .string()
    .min(3)
    .max(100)
    .pattern(nameDescriptionRegx)
    .messages({
      'string.pattern.base':
        'Description can only contain letters and/or numbers.',
    })
    .required(),
  content: joi
    .string()
    .min(50)
    .pattern(contentAreaRegx)
    .messages({
      'string.pattern.base': 'Content can only contain letters and/or numbers.',
    })
    .required(),
});

const tutorialSchema = joi.object({
  name: joi
    .string()
    .min(3)
    .max(50)
    .pattern(nameDescriptionRegx)
    .messages({
      'string.pattern.base': 'Name can only contain letters and/or numbers.',
    })
    .required(),
  description: joi
    .string()
    .min(3)
    .max(100)
    .pattern(nameDescriptionRegx)
    .messages({
      'string.pattern.base':
        'Description can only contain letters and/or numbers.',
    })
    .required(),
});

const tutorialTopicSchema = joi.object({
  name: joi
    .string()
    .min(3)
    .max(50)
    .pattern(nameDescriptionRegx)
    .messages({
      'string.pattern.base': 'Name can only contain letters and/or numbers.',
    })
    .required(),
  description: joi
    .string()
    .min(3)
    .max(100)
    .pattern(nameDescriptionRegx)
    .messages({
      'string.pattern.base':
        'Description can only contain letters and/or numbers.',
    })
    .required(),
  content: joi
    .string()
    .min(50)
    .pattern(contentAreaRegx)
    .messages({
      'string.pattern.base': 'Content can only contain letters and/or numbers.',
    })
    .required(),
});

const webTechSchema = joi.object({
  name: joi
    .string()
    .min(3)
    .max(50)
    .pattern(nameDescriptionRegx)
    .messages({
      'string.pattern.base': 'Name can only contain letters and/or numbers.',
    })
    .required(),
  description: joi
    .string()
    .min(3)
    .max(100)
    .pattern(nameDescriptionRegx)
    .messages({
      'string.pattern.base':
        'Description can only contain letters and/or numbers.',
    })
    .required(),
});

const webTechTopicSchema = joi.object({
  name: joi
    .string()
    .min(3)
    .max(50)
    .pattern(nameDescriptionRegx)
    .messages({
      'string.pattern.base': 'Name can only contain letters and/or numbers.',
    })
    .required(),
  description: joi
    .string()
    .min(3)
    .max(100)
    .pattern(nameDescriptionRegx)
    .messages({
      'string.pattern.base':
        'Description can only contain letters and/or numbers.',
    })
    .required(),
});

// Modifies schemas for PUT requests
const modifySchemaForPut = (schema, excludedFields = []) => {
  // Get the schema description (fields and their validation rules)
  const { keys } = schema.describe();
  console.log('Describe keys', keys);

  // Dynamically make fields optional, but exclude certain fields from Updating/PUT
  const modifiedSchema = Object.keys(keys).reduce((acc, key) => {
    // If the field is in the excludedFields array, make it forbidden (non-editable)
    if (excludedFields.includes(key)) {
      acc[key] = joi.forbidden(); // Mark this field as forbidden for PUT
    } else {
      // Otherwise, make it optional for PUT
      acc[key] = schema.extract(key).optional();
    }
    return acc;
  }, {});

  // Return a new Joi object with the modified schema
  return joi.object(modifiedSchema);
};
// Validates inputs
const validateInputs =
  (method, schema, excludedFields = []) =>
    (req, res, next) => {
      const modifiedSchema =
      method === 'PUT' ? modifySchemaForPut(schema, excludedFields) : schema;
      const { error } = modifiedSchema.validate(req.body);

      if (error) {
        const message = error.details[0].message.replace(/"/g, '');
        return next(new AppError(message, 400));
      }
      return next();
    };

module.exports = {
  userSchema,
  categorySchema,
  blogSchema,
  commentSchema,
  courseSchema,
  courseTopicSchema,
  dsaSchema,
  dsaTopicSchema,
  tutorialSchema,
  tutorialTopicSchema,
  webTechSchema,
  webTechTopicSchema,
  validateInputs,
};
