import React from 'react'
import loading from './../components/img/Spin-1s-200px.gif'
export const LoadDataPage=()=>{
    return(
        <div className="corps-loaddata">
            <div><img alt="loading" src={loading} style={{width:'60px', height:'60px'}}/></div>
        </div>
    )
}