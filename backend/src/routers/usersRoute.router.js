import { Router } from 'express';
import { register } from '../controllers/register.controller.js';
import { login } from '../controllers/login.controller.js';

const router = Router();

router.route('/register').post(register);
router.route('/login').post(login);

export default router;
