import axios from './../global/axiosInstance'
export const postArticle=async(data)=>{
    const response=axios.post('/articles',data)
    return Promise.resolve(response)
}
export const getArticles=()=>(axios.get('/articles')
    .then(response=>response.data))
    .catch(err=>console.log(err.response))

export const getArticleById=async(data)=>{
    const response = axios.get('/articles/'+data)
    console.log('ato ndray : '+response)
    return Promise.resolve(response)
}

export const getCategoriesArticles=()=>(axios.get('/categories')
    .then(response=>response.data))
    .catch(err=>console.log(err.response))

export const postCategoriesArticle=async(data)=>{
    const response=axios.post('/categories',data)
    return Promise.resolve(response)
}

export const getSousCategoriesArticles=()=>(axios.get('/sous-categories')
    .then(response=>response.data))
    .catch(err=>console.log(err.response))

export const postSousCategoriesArticle=async(data)=>{
    const response=axios.post('/sous-categories',data)
    return Promise.resolve(response)
}

export const getUnitesArticles=()=>(axios.get('/unites')
    .then(response=>response.data))
    .catch(err=>console.log(err.response))

export const postUnitesArticle=async(data)=>{
    const response=axios.post('/unites',data)
    return Promise.resolve(response)
}