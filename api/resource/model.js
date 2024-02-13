// build your `Resource` model here
const db = require('../../data/dbConfig.js');


function findResource() {

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