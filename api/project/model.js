// build your `Project` model here
const db = require('../../data/dbConfig.js');

function findProject() {
    return db('projects')
    .then(projects => projects.map(project => ({
        ...project,
        // Convert project_completed from an integer to a boolean for the response
        project_completed: project.project_completed === 1? true : false,
    })));
    // return db('projects as pj')
    // .select('pj.project_id', 'pj.project_name', 'pj.project_description', 'pj.project_completed');
}

function postProject(project) {
      // Convert project_completed from boolean to integer
    //   const projectForDb = {
    //     ...project,
    //     project_completed: project.project_completed ? 1 : 0,
    // };

    // return db('projects')
    //     .insert(projectForDb, 'project_id')
    //     .then(ids => db('projects').where({ project_id: ids[0] }).first())
    //     .then(project => ({
    //         ...project,
    //         // Convert project_completed from integer to boolean
    //         project_completed: project.project_completed === 1 ? true : false,
    //     }));

        return db('projects')
        .insert(project, 'project_id')
        .then(ids => {
            return db('projects')
                .where({ project_id: ids[0] })
                .first()
                .then(project => {
                    return {
                        ...project,
                        project_completed: project.project_completed === 1 ? true : false,
                    };
                });
        });
}




module.exports = {
    findProject, 
    postProject,
}

