import axios from './../global/axiosInstance'
export const postAchat=async(data)=>{
   const response = axios.post('/achats',data)
    return Promise.resolve(response)
}