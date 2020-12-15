import React from 'react'
import { Link } from "react-router-dom"
import { Badge, Row,Col,Button  } from 'react-materialize'
import buy_16px from './../components/img/buy_16px.png'
import transaction_list_16px from './../components/img/transaction_list_16px.png'
import return_purchase_16px from './../components/img/return_purchase_16px.png'
import return_purchase_d_16px from './../components/img/return_purchase_d_16px.png'
import { colors } from "../global/colors"
import {listeArticlesUrl,qrCodeArticlesUrl} from '../global/urls'
const { primary } = colors
export const HistoriquesHeaderPage=()=>{
    return(
        <div>
            <div
                style={{
                    background:'#d0d0d050',
                    marginTop:5,
                    paddingLeft: 20, 
                    paddingRight: 20,
                    height:28,
                    boxShadow:'none',
                    width:'100%',
                    height:'fit-content',
                    display: "inline-block"
                }}
                className='sous-menubar'
            >
                <Button flat small>
                    <Link to='/historiques'>
                        <img src={transaction_list_16px}/> Toutes transactions
                    </Link>
                </Button>
                <Button flat small>
                    <Link to='/historiques/achats'>
                    <img src={buy_16px}/> Achats
                    </Link>
                </Button>
                <Button flat small>
                    <Link to='/historiques/ventes'>
                    <img src={return_purchase_16px}/> Ventes
                    </Link>
                </Button>
                <Button flat small>
                    <Link to='/historiques/ventes-par-jour'>
                    <img src={return_purchase_d_16px}/> Ventes par jour
                    </Link>
                </Button>
            </div>
        </div>
    )
}