import axios from 'axios'

import createAction from '../services/createActions';

const GET_PROJECTS = 'projects/GET_PROJECTS';
const GET_PROJECTS_SUCCESS = 'projects/GET_PROJECTS_SUCCES'
const GET_PROJECTS_FAILED = 'projects/GET_PROJECTS_FAILED'

const DELETE_PROJECT = 'projects/DELETE_PROJECT';
const DELETE_PROJECT_SUCCESS = 'projects/DELETE_PROJECT_SUCCESS'
const DELETE_PROJECT_FAILED = 'projects/DELETE_PROJECT_FAILED'

const POST_PROJECT = 'projects/POST_PROJECT'; 
const POST_PROJECT_SUCCESS = 'projects/POST_PROJECT_SUCCESS';
const POST_PROJECT_FAILED = 'project/POST_PROJECT_FAILED';

const initialState = {
    projects: [],
    loading: false,
    error: null,
  };

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_PROJECTS:
            return {
              ...state,
              loading: true,
              error: null,
            };
        case GET_PROJECTS_SUCCESS:
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
        case DELETE_PROJECT:
            return {
              ...state,
              loading: true,
              error: null,
            };
        case DELETE_PROJECT_SUCCESS: 
            return {
              ...state,
              projects: state.projects.filter(project => action.project._id !== project._id),
              loading: false,
              error: null,
            };
        case DELETE_PROJECT_FAILED:
            return {
              ...state,
              error: action.error,
              loading: false,
            };
        case POST_PROJECT: 
            return {
              ...state,
              loading: true,
              error: null,
            };
        case POST_PROJECT_SUCCESS:
            return {
              ...state,
              projects: [...state.projects, action.project], 
              error: null,
            };
        case POST_PROJECT_FAILED:
            return {
              ...state,
              error: action.error,
            };
      default: 
        return state;
    }
  };

export const requestPostProject = () => ({ type: POST_PROJECT });
export const PostProjectSucess = project => ({ type: POST_PROJECT_SUCCESS, project });  
export const postProjectFailed = error => ({ type: POST_PROJECT_FAILED, error });

export const postProject = (projectname, description) => dispatch => new Promise((resolve) => {
  dispatch(requestPostProject());
  console.log("UIT DE STATE", projectname, description)
  axios.post('http://localhost:9000/projects/addProject', {
    projectname,
    description,
  })
  .then((res) => {
    console.log("RES", res.data)
    dispatch(PostProjectSucess(res.data))
    resolve(res.data)
  })
  .catch((error) => {
    dispatch(postProjectFailed(error));
  })
})

export const requestProjects = () => ({ type: GET_PROJECTS });
export const receiveProjects = projects => ({ type: GET_PROJECTS_SUCCESS, projects });
export const receiveProjectsFail = error => ({ type: GET_PROJECTS_FAILED, error });

export const fetchProjects = () => dispatch => new Promise((resolve) => {
  dispatch(requestProjects());

  axios.get('http://localhost:9000/projects')
    .then((res) => {
      dispatch(receiveProjects(res.data));
      resolve(res.data);
    })
    .catch((error) => {
      dispatch(receiveProjectsFail(error));
    });
  })

export const projectDelete = () => ({ type: DELETE_PROJECT });
export const deleteProjectSuccess = project => ({ type: DELETE_PROJECT_SUCCESS, project});
export const deleteProjectFailed = error => ({ type: DELETE_PROJECT_FAILED, error});

export const deleteProject = id => dispatch => new Promise((resolve) => {
  dispatch(projectDelete());

  axios.delete(`http://localhost:9000/projects/deleteProject/${id}`)
    .then((res) => {
    dispatch(deleteProjectSuccess(res.data))
    resolve(res.data)
    })
    .catch((error) => {
      dispatch(deleteProjectFailed(error));
    })
  })