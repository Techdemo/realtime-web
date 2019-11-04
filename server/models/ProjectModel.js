const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    projectname: {
        type: String,
        required: true,
        trim: true
    }, 
    description: {
        type: String,
        required: true,
        trim: true
    }
}); 

const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;