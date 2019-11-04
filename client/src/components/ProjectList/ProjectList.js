import React from 'react';
import ProjectThumbnail from './ProjectThumbnail/ProjectThumbnail'
import { connect } from 'react-redux';
import { fetchProjects } from '../../ducks/projects'

const ProjectList = (props) => {
    console.log("PROPS IN PROJECTLIST", props)
    return props.projects.projects.map(project => (
        <ProjectThumbnail
            key={project._id}
            projectname={project.projectname}
            description={project.description}
            id={project._id}
            deleteTaskHandler={props.deleteTask}
        />
    ))
}


const mapStateToProps = state => ({
    ...state
});
  
export default connect(mapStateToProps, { fetchProjects })(ProjectList);