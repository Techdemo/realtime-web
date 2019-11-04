const express = require('express');
const projectModel = require('../models/ProjectModel');

const app = express();

app.get('/', async (req, res) => {
    const projects = await projectModel.find({});
    
    try {
        res.send(projects)
    } catch (err) {
        res.status(500).send(err)
    }
});

app.post('/addProject', async (req, res) => {
    const project = new projectModel(req.body);
    try {
        await project.save();
        res.send(project);
    } catch (err) {
        console.log("ERR", err)
        res.status(500).send(err)
    }
});

app.delete('/deleteProject/:id', async (req, res) => {
    try {
        const project = await projectModel.findByIdAndDelete(req.params.id)
        if(!project) res.status(404).send("No Project Found")
        res.status(200).send(project)
    } catch (err) {
        res.status(500).send(err)
    }
})

app.patch('/project/:id', async(req, res) => {
    try {
        await projectModel.findByIdAndUpdate(req.params.id, req.body)
        await projectModel.save()
        res.send(project)
    } catch (err) {
        res.status(500).send(err)
    }
})

module.exports = app