// build your `/api/resources` router here
const express = require('express');
const Resources = require('./model.js');

const router = express.Router();


router.get('/', (req, res, next) => {
    Resources.findResource()
        .then(resources => {
            res.json(resources);
        })
        .catch(next); // Pass errors to the next middleware function
});

router.post('/', (req, res, next) => {
    const resourceData = req.body;

    Resources.postResource(resourceData)
        .then(newResource => {
            res.status(201).json(newResource);
        })
        .catch(next); // Pass errors to the next middleware function
});

module.exports = router;