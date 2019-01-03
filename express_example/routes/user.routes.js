import { Router } from 'express';
import Validate from 'express-validation';
import UserController from '../controllers/user.controller';
import Joi from 'joi';
import { createUser, updateUser } from '../validators/user.js';

const router = new Router();

// Get all users
// ResfulAPI: 
// Get data: method: GET
// Create new data: method: POST
// Update data: method: PUT
// Delete data: method: DELETE
// PATCH... Update

// Resful naming.
// CRUD user
router.get('/users', UserController.getAll);
router.get('/users/:id', UserController.getOneUser);// req.params
router.post('/users', [ Validate(createUser) ], UserController.addUser); // req.body
router.put('/users/:id', [ Validate(updateUser) ], UserController.updateUser); // req.body
router.delete('/users/:id', UserController.deleteUser);


export default router;