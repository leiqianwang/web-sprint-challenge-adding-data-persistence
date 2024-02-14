// build your `Resource` model here
const db = require('../../data/dbConfig.js');


function findResource() {
    return db('resources as r')
        .select('r.resource_id', 'r.resource_name', 'r.resource_description')
        .then(resources => resources.map(resource => ({
            ...resource,
            resource_id: resource.resource_id
        })));
}

function postResource(resource) {
    return db('resources')
        .insert(resource)
        .then(([resource_id]) => {
            return db('resources').where({ resource_id }).first();
        });
}

module.exports = {
    findResource,
    postResource,
}