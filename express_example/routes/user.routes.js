import { Router } from 'express';
import Validate from 'express-validation';
import UserController from '../controllers/user.controller';
import { create, update } from '../validators/user.js';

const router = new Router();

router
    .get('/users', UserController.getAll)
    .post('/users', [ Validate(create) ], UserController.create);

router.post('/login', UserController.login);

router
    .get('/users/:id', UserController.get)
    .put('/users/:id', [ Validate(update) ], UserController.update)
    .delete('/users/:id', UserController.delete);


export default router;