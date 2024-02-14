// build your `Task` model here
const db = require('../../data/dbConfig.js');


function findTask() {
    return db('tasks as t')
    .join('projects as p', 't.project_id', '=', 'p.project_id')
    .select(
        't.task_id',
        't.task_description',
        't.task_notes',
        't.task_completed',
        't.project_id',
        'p.project_name',
        'p.project_description'
    )
    .then(tasks => tasks.map(task => ({
        ...task,
        task_completed: task.task_completed === 1 ? true : false, // Convert back to boolean for response
    })));
}






function postTask(task) {
    const taskForDb = {
        ...task,
        task_completed: task.task_completed ? 1 : 0, // Convert boolean to integer
    };

    return db('tasks')
        .insert(taskForDb)
        .then(ids => {
            return db('tasks').where({ task_id: ids[0] }).first();
        })
        .then(task => ({
            ...task,
            task_completed: task.task_completed === 1 ? true : false, // Convert back to boolean for response
        }));
}




module.exports = {
    findTask, 
    postTask,
}