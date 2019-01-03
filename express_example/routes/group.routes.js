import { Router } from 'express';
import GroupController from '../controllers/group.controller';
import validate from 'express-validation';
import groupValidators from '../validators/group';

const router = new Router();

router.get('/groups', GroupController.getAll);
router.get('/groups/:id', GroupController.getGroup);
router.post('/groups', validate(groupValidators.createGroup), GroupController.addGroup);
router.put('/groups/:id', validate(groupValidators.updateGroup), GroupController.updateGroup);
router.delete('/groups/:id', validate(groupValidators.deleteGroup), GroupController.deleteGroup);


export default router;