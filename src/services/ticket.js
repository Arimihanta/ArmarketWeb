import axios from './../global/axiosInstance'
export const putTicket=async(data)=>{
   const response = axios.put('/ticket',data)
    return Promise.resolve(response)
}
export const getTicket=async()=>{
    const response = axios.get('/ticket')
     return Promise.resolve(response)
}