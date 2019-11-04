import React from 'react';

const ProjectThumbnail = (props) => {
    return (
        <div key={props.id}>
            <h2>{props.projectname}</h2>
            <h3>{props.description}</h3>
            <button id={props.id} onClick={props.deleteTaskHandler}>Delete Project</button>
        </div>
    )
}

export default ProjectThumbnail