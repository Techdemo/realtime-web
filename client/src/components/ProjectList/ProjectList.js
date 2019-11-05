import React from 'react';
import ProjectThumbnail from './ProjectThumbnail/ProjectThumbnail'
import { connect } from 'react-redux';
import { deleteProject } from '../../ducks/projects';

const ProjectList = ({projects, deleteProject}) => {

    const handleDeleteProject = (event) => {
        deleteProject(event.target.id)
      }

    return projects.map(project => (
        <ProjectThumbnail
            key={project._id}
            projectname={project.projectname}
            description={project.description}
            id={project._id}
            deleteTaskHandler={handleDeleteProject}
        />
    ))
}

const mapStateToProps = state => ({
    projects: state.projects.projects
});

export default connect(mapStateToProps, { deleteProject })(ProjectList);