// build your `Project` model here
const db = require('../../data/dbConfig.js');

function findProject() {
    // return db('projects')
    // .then(projects => projects.map(project => ({
    //     ...project,
    //     // Convert project_completed from an integer to a boolean for the response
    //     project_completed: project.project_completed === 1? true: false,
    // })));
    return db('projects as pj')
        .select('pj.project_id', 'pj.project_name', 'pj.project_description', 'pj.project_completed')
        .then(projects => projects.map(project => ({
            ...project,
            project_completed: project.project_completed === 1 ? true : false,
        })));
}

function postProject(project) {
    const projectForDb = {
        ...project,
        project_completed: project.project_completed ? 1 : 0, // Safely assume false if undefined
    };

    return db('projects')
        .insert(projectForDb, 'project_id')
        .then(ids => db('projects').where({ project_id: ids[0] }).first())
        .then(project => project ? {
            ...project,
            project_completed: project.project_completed === 1
        } : undefined); // Handle potential undefined project
}





module.exports = {
    findProject, 
    postProject,
}

