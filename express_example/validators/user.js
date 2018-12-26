'use strict';
import Joi from 'joi';

exports.createUser = {
    body: {
        name: Joi.string().required().min(2).max(255)
    },
};

exports.updateUser = {
    body: {
        name: Joi.string().min(2).max(255)
    },
    params: {
    	id: Joi.string().required()
    }
};

exports.deleteUser = {
  body: {
    email: Joi.string().email({minDomainAtoms: 2}),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
  },
  params: {
    id: Joi.string().required(),
  }
};