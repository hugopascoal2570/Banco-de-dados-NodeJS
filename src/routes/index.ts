import { Router } from 'express';

import * as HomeController from '../controllers/homeController';
import * as InfoController from '../controllers/infoController';
import * as UserController from '../controllers/userController';
import { User } from '../models/User';

const router = Router();

router.get('/', HomeController.home);

router.post('/novousuario', HomeController.newUser);

router.get('/usuario/:id/addAge',UserController.addAge);
router.get('/usuario/:id/decreaseAge',UserController.decreaseAge);
router.get('/usuario/:id/deleteUser', UserController.deleteUser);

router.get('/contato', InfoController.contato);
router.get('/sobre', InfoController.sobre);

router.get('/nome', UserController.nome);
router.get('/idade', UserController.idadeForm);
router.post('/idade-resultado', UserController.idadeAction);

export default router;