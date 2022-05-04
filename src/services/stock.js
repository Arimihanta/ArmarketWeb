import axios from './../global/axiosInstance'
export const getStocks=async()=>{
    const response=axios.get('/stocks')
    return Promise.resolve(response)
}

export const getStockParReference=async(data)=>{
    const response=axios.get('/stocks/'+data)
    return Promise.resolve(response)
}
export const deleteStockParReference=async(data)=>{
    const response=axios.delete('/stocks/'+data)
    return Promise.resolve(response)
}

export const postStock=async(data)=>{
    const response=axios.post('/stocks',data)
    return Promise.resolve(response)
}

export const putStockActuel=async(data)=>{
    const response=axios.put('/stocks/actuel',data)
    return Promise.resolve(response)
}
export const putMargeMinStock=async(data)=>{
    const response=axios.put('/stocks/seuil-min',data)
    return Promise.resolve(response)
}