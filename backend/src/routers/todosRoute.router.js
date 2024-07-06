import { Router } from 'express';
import { addTodo } from '../controllers/addTodo.controller.js';
import { showTodos } from '../controllers/showTodos.controller.js';
import { deleteTodo } from '../controllers/deleteTodos.controller.js';
import { checkAuthHeader } from '../middlewares/checkAuthHeader.js';
import { isTodoDone } from '../controllers/isTodoDone.controller.js';

const router = Router();

router.route('/').get(checkAuthHeader, showTodos);
router.route('/').post(checkAuthHeader, addTodo);
router.route('/').delete(checkAuthHeader, deleteTodo);
router.route('/').put(checkAuthHeader, isTodoDone);

export default router;
