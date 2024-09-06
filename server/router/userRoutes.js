const express = require('express');
const router = express.Router();
const userController = require('../controller/userController')

router.get('/all_users', userController.findAllUsers); 
router.get('/all_tasks', userController.findAllTasks);
router.get('/all_usernames', userController.findAllUsersName);
router.get('/all_task_usernames', userController.fetchTasksWithUserNames);

router.post('/move-task', userController.updateData);

module.exports = router;