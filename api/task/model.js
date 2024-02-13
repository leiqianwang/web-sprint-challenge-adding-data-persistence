// build your `Task` model here
const db = require('../../data/dbConfig.js');


function findTask() {

}





function postTask(task) {
    const taskForDb = {
        ...task,
        task_completed: task.task_completed ? 1 : 0,
    };

    return db('tasks')
        .insert(taskForDb)
        .then(([task_id]) => {
            return db('tasks as t')
                .join('projects as p', 't.project_id', 'p.project_id')
                .select('t.*', 'p.project_name', 'p.project_description')
                .where('t.task_id', task_id)
                .first();
        });
}




module.exports = {
    findTask, 
    postTask,
}