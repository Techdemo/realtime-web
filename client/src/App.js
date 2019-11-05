import React from 'react';
import { connect } from 'react-redux';
import { fetchProjects, deleteProject, postProject } from './ducks/projects'

import './App.css';
import ProjectList from './components/ProjectList/ProjectList'

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
  }

  componentDidMount(){
    this.props.fetchProjects()
  }

  handleSubmit = event => {
    event.preventDefault();
    const { projectname, description } = this.state

    this.props.postProject(projectname, description)
  }



  handleChangeName(event) {
    this.setState({projectname: event.target.value });
  }

  handleChangeDescription(event) {
    this.setState({description: event.target.value });
  }


  render() {

    return (
      <div className="App">
        <ProjectList />
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
  projects: state.projects.projects
});

export default connect(mapStateToProps, { fetchProjects, deleteProject, postProject })(App);
