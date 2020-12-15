import axios from './../global/axiosInstance'
export const postAchatArticle=async(data)=>{
    const response=axios.post('/achats-articles',data)
    return Promise.resolve(response)
}
export const getAchatsArticles=()=>(axios.get('/achats-articles')
    .then(response=>response.data))
    .catch(err=>console.log(err.response))

export const getAchatsArticlesByIntervalleDate=async(data)=>{
    const response=axios.get('/achats-articles/by_intervalle_date',{params:{date:data}})
    console.log(response)
    return Promise.resolve(response)
}