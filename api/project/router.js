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

    const { project_name, project_description, project_completed } = req.body;

    // Basic validation for project_name
    if (!project_name || typeof project_name !== 'string' || !project_name.trim()) {
        return res.status(400).json({ message: 'Invalid project_name' });
    }

    const projectData = {
        project_name,
        project_description,
        project_completed
    };

    try {
        const newProject = await Projects.postProject(projectData);
        if (newProject) {
            res.status(201).json(newProject);
        } else {
            next({ status: 404, message: 'Project not found after creation' });
        }
    } catch (error) {
        next(error);
    }
});
//     const projectData = req.body;

//     try {
//         const newProject = await Projects.postProject(projectData);
//         if (newProject) {
//             res.status(201).json(newProject);
//         } else {
//             next({ status: 404, message: 'Project not found after creation' });
//         }
//     } catch (error) {
//         next(error);
//     }
// });
   

 module.exports = router;
