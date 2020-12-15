import axios from './../global/axiosInstance'
export const getLettreDuChiffre=async(data)=>{
    const response=axios.get('/chiffre-en-lettre/'+data)
    return Promise.resolve(response)
}