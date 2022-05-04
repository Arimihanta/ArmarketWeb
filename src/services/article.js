import axios from './../global/axiosInstance'
export const postArticle=async(data)=>{
    const response=axios.post('/articles',data)
    return Promise.resolve(response)
}
export const putArticle=async(data)=>{
    const response=axios.put('/articles',data)
    return Promise.resolve(response)
}
export const getArticles=async()=>{
    const response=axios.get('/articles')
    return Promise.resolve(response)
}

export const getArticleById=async(data)=>{
    const response = axios.get('/articles/'+data)
    return Promise.resolve(response)
}

export const deleteArticleById=async(data)=>{
    const response = axios.delete('/articles/'+data)
    return Promise.resolve(response)
}

export const getCategoriesArticles=()=>(axios.get('/categories')
    .then(response=>response.data))
    .catch(err=>console.log(err.response))

export const getFournisseurs=()=>(axios.get('/fournisseurs')
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

export const getQRCode=async(code)=>{
    const response=axios.get('/qrcode/'+code)
    return Promise.resolve(response)
}
export const getBarCode=async(code)=>{
    const response=axios.get('/barcode/'+code)
    return Promise.resolve(response)
}

export const generateReference=async(data)=>{
    const response=axios.post('/codes',data)
    return Promise.resolve(response)
}