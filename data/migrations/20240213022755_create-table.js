/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema 
       .createTable('projects', tbl => {
        tbl.increments('project_id');
        tbl.string('project_name', 128).unique().notNullable();
        tbl.text('project_description').nullable(); // Optional
        tbl.integer('project_completed').defaultTo(0); // Default to false, using integer for broader DB compatibility

       })
       .createTable('resources', tbl => {
        tbl.increments('resource_id');
        tbl.string('resource_name', 128)
        .unique()
        .notNullable();
        tbl.text('resource_description').nullable(); // Optional
    })
       
       .createTable('tasks', tbl => {
        tbl.increments('task_id');
        tbl.text('task_description').notNullable();
        tbl.text('task_notes').nullable(); // Optional
        tbl.integer('task_completed').defaultTo(0);
        tbl.integer('project_id')
        .unsigned()
        .notNullable()
        .references('project_id')
        .inTable('projects')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
       })


};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema 
       .dropTableIfExists('tasks')
       .dropTableIfExists('resources')
       .dropTableIfExists('projects');
  
};
