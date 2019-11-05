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