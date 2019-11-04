import Axios from 'axios'

export const FetchProjects = () => new Promise((resolve, reject) => {
    Axios('http://localhost:9000/projects')
    .then((response) => {
        resolve(response.data)
    })
    .catch((error) => {
        reject(error)
    })
})

export const PostProject = (projectname, description) => new Promise((resolve, reject) => {
    Axios.post('http://localhost:9000/projects/addProject', {
        projectname,
        description,
    })
    .then((response) => {
        console.log("RES", response)
        resolve(response)
    })
    .catch((error) => {
        console.log("ERROR", error)
        reject(error)
    })
})

// export const DeleteProject = (id) => new Promise((resolve, reject) => {
//     console.log("ID", id)
//     Axios.delete(`http://localhost:9000/projects/deleteProject/${id}`)
//     .then((response) => {
//         resolve(response.data)
//     })
//     .catch((error) => {
//         reject(error)
//     })
// })