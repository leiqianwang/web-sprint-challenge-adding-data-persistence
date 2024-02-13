/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    // First, create the 'projects' table
    return knex.schema.createTable('projects', tbl => {
      tbl.increments('project_id');
      tbl.string('project_name', 128).unique().notNullable();
      tbl.text('project_description').nullable(); // Optional
      tbl.boolean('project_completed').defaultTo(false); // Default to false, using integer for broader DB compatibility
    })
    .then(function () {
      // After 'projects' is created, create 'resources'
      return knex.schema.createTable('resources', tbl => {
        tbl.increments('resource_id');
        tbl.string('resource_name', 128).unique().notNullable();
        tbl.text('resource_description').nullable(); // Optional
      });
    })
    .then(function () {
      // After 'resources', create 'tasks'
      return knex.schema.createTable('tasks', tbl => {
        tbl.increments('task_id');
        tbl.text('task_description').notNullable();
        tbl.text('task_notes'); // Optional
        tbl.boolean('task_completed').defaultTo(false);
        tbl.integer('project_id')
          .unsigned()
          .notNullable()
          .references('project_id')
          .inTable('projects')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
      });
    });
  };
  
  exports.down = function(knex) {
    // Drop tables in reverse order of creation to respect foreign key constraints
    return knex.schema
      .dropTableIfExists('tasks')
      .dropTableIfExists('resources')
      .dropTableIfExists('projects');
  };
  