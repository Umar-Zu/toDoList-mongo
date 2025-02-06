import express from 'express';
import * as todoController from '../controllers/todoController.js';

/**
 * @file Todo routes module
 * @module routes/todoRoutes
 * @description Defines the routes for handling to-do list operations.
 *
 * This module sets up the routing logic for the to-do list functionality, including routes to:
 * 1. View the home items.
 * 2. Add, edit, and delete to-do items.
 * 3. View a custom list based on a specified parameter.
 */

const router = express.Router();

router.get('/', todoController.getHomeItems);
router.post('/', todoController.addItem);
router.post('/edit', todoController.editItem);
router.post('/delete', todoController.deleteItem);
router.get('/:customNewList', todoController.getCustomList);

export default router;
