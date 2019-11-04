import axios from 'axios'

import createAction from '../services/createActions';

const GET_PROJECTS = 'projects/GET_PROJECTS';
const GET_PROJECTS_SUCCESS = 'projects/GET_PROJECTS_SUCCES'
const GET_PROJECTS_FAILED = 'projects/GET_PROJECTS_FAILED'

const initialState = {
    projects: [],
    loading: false,
    error: null,
  };


export default (state = initialState, action) => {
    switch (action.type) {
        case GET_PROJECTS:
          console.log("Wat gebeurd er")
          console.log("initialstate",initialState )
            return {
              ...state,
              loading: true,
              error: null,
            };
        case GET_PROJECTS_SUCCESS:
          console.log("ACTION", action.projects)
          console.log("STATE", state)
            return {
                ...state,
                projects: action.projects,
                error: null,
            };
        case GET_PROJECTS_FAILED:
            return {
                ...state,
                error: action.error,
                loading: true,
            };
      default:
        return state;
    }
  };  


  export const requestProjects = () => ({ type: GET_PROJECTS });
  export const receiveProjects = projects => ({ type: GET_PROJECTS_SUCCESS, projects });
  export const receiveProjectsFail = error => ({ type: GET_PROJECTS_FAILED, error });
  
  export const fetchProjects = () => dispatch => new Promise((resolve) => { 
    dispatch(requestProjects());
  
    axios.get('http://localhost:9000/projects')
    .then((res) => {
      console.log("AXIOS", res.data)
      dispatch(receiveProjects(res.data));
      resolve(res.data);    
    })
    .catch((error) => {
      dispatch(receiveProjectsFail(error));
    }); 
  })