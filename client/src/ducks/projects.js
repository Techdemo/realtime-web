import axios from 'axios'

import createAction from '../services/createActions';

const GET_PROJECTS = 'projects/GET_PROJECTS';
const GET_PROJECTS_SUCCESS = 'projects/GET_PROJECTS_SUCCES'
const GET_PROJECTS_FAILED = 'projects/GET_PROJECTS_FAILED'

const DELETE_PROJECT = 'projects/DELETE_PROJECT';
const DELETE_PROJECT_SUCCESS = 'projects/DELETE_PROJECT_SUCCESS'
const DELETE_PROJECT_FAILED = 'projects/DELETE_PROJECT_FAILED'

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
      dispatch(receiveProjects(res.data));
      resolve(res.data);
    })
    .catch((error) => {
      dispatch(receiveProjectsFail(error));
    });
  })

  export const projectDelete = () => ({ type: DELETE_PROJECT });
  export const deleteProjectSuccess = () => ({ type: DELETE_PROJECT_SUCCESS});
  export const deleteProjectFailed = () => ({ type: DELETE_PROJECT_FAILED});

  export const deleteProject = id => dispatch => new Promise((resolve) => {
    dispatch(projectDelete());

    axios.delete(`http://localhost:9000/projects/deleteProject/${id}`)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        dispatch(deleteProjectFailed(error));
      })
  })