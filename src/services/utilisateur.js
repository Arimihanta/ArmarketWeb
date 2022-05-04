import axios from './../global/axiosInstance'
export const postUtilisateur=async(data)=>{
   const response = axios.post('/utilisateurs',data)
    return Promise.resolve(response)
}
export const putUtilisateur=async(data)=>{
    const response = axios.put('/utilisateurs',data)
     return Promise.resolve(response)
 }
export const getUtilisateurs=async()=>{
    const response = axios.get('/utilisateurs')
     return Promise.resolve(response)
}