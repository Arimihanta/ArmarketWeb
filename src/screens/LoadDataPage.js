import React from 'react'
import {Row, Col,Preloader} from 'react-materialize'
import loading from './../components/img/Spin-1s-200px.gif'
export const LoadDataPage=()=>{
    return(
        <div className="corps-loaddata">
            <div><img src={loading} style={{width:'60px', height:'60px'}}/></div>
        </div>
    )
}