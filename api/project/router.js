// build your `/api/projects` router here
const express = require('express');
const Projects = require('./model.js'); // Ensure this is the correct path to your model

const router = express.Router();

// [GET] /api/projects
router.get('/', (req, res, next) => {
    Projects.findProject()
        .then(projects => {
            res.json(projects); // Send the formatted projects data
        })
        .catch(error => {
            next(error); // Pass errors to error-handling middleware
        });
});
// [POST] /api/projects
// Assuming validation logic needs to be compacted as well
router.post('/', async (req, res, next) => {
   

    // // Basic validation for project_name
    // if (!project_name || typeof project_name !== 'string' || !project_name.trim()) {
    //     return res.status(400).json({ message: 'Invalid project_name' });
    // }

    // // Optional: Validate project_completed if you need to ensure it's provided as a boolean
    // if (project_completed !== undefined && typeof project_completed !== 'boolean') {
    //     return res.status(400).json({ message: 'project_completed must be a boolean' });
    // }

    try {
        const { project_name, project_description, project_completed } = req.body;
        const newProject = await Projects.postProject(project_completed, project_name, project_description);
        if (newProject) {
            res.status(201).json(newProject); // newProject includes project_completed in boolean format
        } else {
            // Using next to pass control to the global error handler
            next({ status: 404, message: 'Project not found after creation' });
        }
    } catch (error) {
        // Pass any caught error to the next error handling middleware
        next(error);
    }
});


module.exports = router;
