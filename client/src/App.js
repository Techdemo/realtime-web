import React from 'react';
import { connect } from 'react-redux';
import { fetchProjects, deleteProject } from './ducks/projects'

import './App.css';
import ProjectList from './components/ProjectList/ProjectList'

import { PostProject } from './services/fetchApi'

class App extends React.Component {
  constructor(){
    super()

    this.state = {
      projects: [],
      projectname: '',
      description: '',
    }

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDeleteProject = this.handleDeleteProject.bind(this)
  }

  componentDidMount(){
    this.props.fetchProjects()
  }

  handleChangeName(event) {
    this.setState({projectname: event.target.value });
  }

  handleChangeDescription(event) {
    this.setState({description: event.target.value });
  }

  handleSubmit(event){
    event.preventDefault();
    const { projectname, description } = this.state

    PostProject(projectname, description)
    .then((response) => {
      const newState = [...this.state.projects, response.data]
      this.setState({
        ...this.state,
        projects: newState
      })
    })
  }

  handleDeleteProject(event){
    const id = event.target.id
    deleteProject(id)
  }

  render() {
    const { projects } = this.props
    console.log("PROJECTS IN RENDER", projects)

    return (
      <div className="App">
        <ProjectList
          projects={this.state.projects}
          deleteTask={this.handleDeleteProject}
        />
        <form onSubmit={this.handleSubmit}>
          <label>
            Project name:
            <input type="text" name="projectname" value={this.state.projectname} onChange={this.handleChangeName} />
          </label>
          <label>
            Project description:
            <input type="text" name="description" value={this.state.description} onChange={this.handleChangeDescription}/>
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state
});

export default connect(mapStateToProps, { fetchProjects, deleteProject })(App);
