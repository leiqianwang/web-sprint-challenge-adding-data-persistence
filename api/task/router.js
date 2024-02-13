// build your `/api/tasks` router here
const express = require('express');
const Tasks = require('./model.js');

const router = express.Router();


router.get('/', async (req, res, next) => {
    try {
        const tasks = await Tasks.findTask();
        res.json(tasks);
    } catch (error) {
        next(error);
    }
});



router.post('/', async (req, res, next) => {
    try {
        const newTask = await Tasks.postTask(req.body);
        res.status(201).json(newTask);
    } catch (error) {
        next(error);
    }
});





module.exports = router;