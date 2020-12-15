import React from 'react'
import { Link } from "react-router-dom"
import { Icon, Badge, Row,Col,Button  } from 'react-materialize'
import { colors } from "../global/colors"
const { primary } = colors
const path = require('path');
export const ArticleHeaderPage=()=>{
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
                    <Link to='/articles'>
                    <i class="mdi mdi-archive"/> Toutes articles
                    </Link>
                </Button>
                <Button flat small>
                    <Link to='/articles/stocks'>
                    <i class="mdi mdi-format-list-bulleted"/> Stocks
                    </Link>
                </Button>
                <Button flat small>
                    <Link to='/articles/qrcode'>
                        <i className="mdi mdi-barcode"/> Code QR/Code Bar
                    </Link>
                </Button>
                <Button flat small>
                    <Link to='/articles/prix'>
                    <i className="fa fa-money"/> Prix des produits
                    </Link>
                </Button>
            </div>
        </div>
    )
}