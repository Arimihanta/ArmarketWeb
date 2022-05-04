import axios from './../global/axiosInstance'
export const postVente=async(data)=>{
   const response = axios.post('/ventes',data)
    return Promise.resolve(response)
}

export const postFacture=async(data)=>{
    const response = axios.post('/factures',data)
     return Promise.resolve(response)
}

export const postVenteArticle=async(data)=>{
    const response=axios.post('/ventes-articles',data)
    return Promise.resolve(response)
}

export const deleteVenteArticleByArticle=async(data)=>{
    const response=axios.delete('/ventes-articles/article/'+data)
    return Promise.resolve(response)
}

export const getVentesArticlesByIntervalleDate=async(data)=>{
    const response=axios.get('/ventes-articles/by_intervalle_date',{params:{date:data}})
    return Promise.resolve(response)
}
export const getVentesArticlesGroupByDate=async(data)=>{
    const response=axios.get('/ventes-articles/group_by_date',{params:{date:data}})
    return Promise.resolve(response)
}
export const getVentesArticlesGroupByDateASC=async(data)=>{
    const response=axios.get('/ventes-articles/group_by_date_asc',{params:{date:data}})
    return Promise.resolve(response)
}
export const getVentesArticlesMensuels=async(annee)=>{
    const response=axios.get('/ventes-articles/mensuels/'+annee)
    return Promise.resolve(response)
}

export const getVentesArticlesAnnuels=async(a_deb, a_fin)=>{
    const response=axios.get('/ventes-articles/annuels',{params:{annee:{
        debut:a_deb,
        fin:a_fin
    }}})
    return Promise.resolve(response)
}