'use strict';
import Joi from 'joi';

exports.create = {
    body: {
        fullName: Joi.object().keys({
            first: Joi.string().min(3).max(30),
            last: Joi.string().min(3).max(30)
        }),
        email: Joi.string().required().email({ minDomainAtoms: 2 }).min(3).max(30),
        password: Joi.string().required().min(3).max(30)

    },
};

exports.update = {
    body: {
        fullName: Joi.object().keys({
            first: Joi.string().min(3).max(30),
            last: Joi.string().min(3).max(30)
        }),
        email: Joi.string().email({ minDomainAtoms: 2 })
    },
    params: {
    	id: Joi.string().required()
    }
};

