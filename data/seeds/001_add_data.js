/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
 
  await knex('tasks').del()
  await knex('resources').del()
  await knex('projects').del()

  // Inserts seed entries
  await knex('projects').insert([
    {project_name: 'Build a web app', project_description: 'A full-stack project.', project_completed: 0},
    {project_name: 'Database migration', project_description: 'Update database schema.', project_completed: 0}
  ]);

  await knex('resources').insert([
    {resource_name: 'Node.js', resource_description: 'Runtime environment'},
    {resource_name: 'Knex.js', resource_description: 'SQL query builder'}
  ]);

  // Assuming tasks are associated with a project_id. Make sure these IDs match actual project IDs in your database.
  await knex('tasks').insert([
    {task_description: 'Design the database schema', task_notes: 'Use dbdesigner.net', task_completed: 0, project_id: 1},
    {task_description: 'Set up backend framework', task_notes: 'Express.js for routing', task_completed: 0, project_id: 1}
  ]);
};
