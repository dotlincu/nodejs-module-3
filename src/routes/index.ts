import { Router } from 'express';

import * as HomeController from '../controllers/homeController';
import * as InfoController from '../controllers/infoController';
import * as UserController from '../controllers/userController';

const router = Router();

router.get('/', HomeController.home);

router.get('/user/create', UserController.CreateNewUser);
router.post('/action-create', UserController.ActionCreateNewUser);
router.get('/user/:id/update', UserController.Update);
router.post('/action-update', UserController.ActionUpdate);
router.get('/user/:id/delete', UserController.Delete);
router.get('/user/:id/addAge', UserController.IncreaseAge);
router.get('/user/:id/subAge', UserController.DecreaseAge);

router.get('/contato', InfoController.contato);
router.get('/sobre', InfoController.sobre);

router.get('/nome', UserController.nome);
router.get('/idade', UserController.idadeForm);
router.post('/idade-resultado', UserController.idadeAction);

export default router;