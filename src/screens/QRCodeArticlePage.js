import React,{useEffect, useState} from 'react'
import {Row, Col, CardPanel} from 'react-materialize'
import { Button } from "./../components/Button"
import {SearchInputText} from "../components/SearchInputText"
import delete_row_16px from './../components/img/delete_row_16px.png'
import { PDFDownloadLink } from '@react-pdf/renderer'
import {getArticles, getBarCode} from '../services/article'
import {PDFDocBarCode} from './../components/PDFDocBarCode'
import {LoadDataPage} from './LoadDataPage'
export const QRCodeArticlePage=()=>{
    const [isLoad, setLoad]=useState(true)
    //list of articles from database
    const [liste_articles, setListeArticles]=useState([])
    //list of articles filtered
    const [liste_articles_filtrees, setListeArticlesFiltrees]=useState([])
    const [liste_articles_selectionnes, setListeArticlesSelectionnes]=useState([])
    const [search_key,setSearchKey]=useState('')

    const loadArticle=async()=>{
        let st=await getArticles()
        if(st.data){
            st=st.data.filter(art=>art.qrcode!=='undefined' && art.qrcode!==undefined && art.qrcode!=='')
            const newList = st.map(async(item) => {
                const barcode= await getBarCode(st.ref_article)
                const updatedItem = {
                    ...item,
                    barcode: barcode.data.barcode,
                    checked: false,
                };
                //console.log(updatedItem)
                return updatedItem;
            });
            if(newList.length>0){
                Promise.all(newList).then(res=>{
                    setListeArticles(res)
                    setListeArticlesFiltrees(res)
                    setLoad(false)
                })
            }
            
        }
        return Promise.resolve(true)
    }

    useEffect(()=>{
         loadArticle()
    },[])
    const onSearchChange  =(e)=>{
        setListeArticlesFiltrees(
            liste_articles.filter(art=>art.designation.sansAccent().toUpperCase().includes(e.target.value.sansAccent().toUpperCase()))
        )
        setSearchKey(e.target.value)
    }
    const onCheckOrUncheck=(e)=>{
        const newList = liste_articles.map(item => {
            if (item.ref_article === e.target.id) {
                const updatedItem = {
                  ...item,
                  checked: !item.checked,
                };
                return updatedItem;
            }
            return item;
        });
        setListeArticles(newList)
        setListeArticlesSelectionnes(newList.filter(a=>a.checked===true))
        const art_fi=newList.filter(art=>art.designation.sansAccent().toUpperCase().includes(search_key.sansAccent().toUpperCase()))
        
        setListeArticlesFiltrees(art_fi)
    }
    const onSelectionnerTout=()=>{
        const newList = liste_articles.map(item => {
            const updatedItem = {
                ...item,
                checked: true,
            };
            return updatedItem;
        });
        setListeArticles(newList)
        setListeArticlesSelectionnes(newList.filter(a=>a.checked===true))
    }
    const onDeselectionnerTout=()=>{
        const newList = liste_articles.map(item => {
            const updatedItem = {
                ...item,
                checked: false,
            };
            return updatedItem;
        });
        setListeArticles(newList)
        setListeArticlesSelectionnes(newList.filter(a=>a.checked===true))
    }
    if(isLoad) {
        return(
            <LoadDataPage/>
        )
    }
    return(
        <div style={{ paddingLeft: 20, paddingRight: 20}}>
            <Row className="no-margin">
                <Col m={9}>
                    <Row justify="center" style={{marginBottom:'10px', marginTop:10}}>
                        <Col m={9}>

                        </Col>
                        <Col m={3}>
                            <SearchInputText style={{float:'right'}} id="search_key" onChange={onSearchChange} placeholder="Rechercher" />
                        </Col>
                    </Row>
                    <Row 
                        justify="space-between"
                    style={{
                        overflowY:'auto',
                        marginBottom:'0px',
                        maxHeight: 'calc(100vh - 230px )'
                    }}>
                    {
                        liste_articles_filtrees.map((article,key)=>
                            <Col m={6} key={key}>
                                <CardPanel className="card-price">
                                    <Row justify="center" style={{marginBottom:0}}>
                                        <Col s={12} style={{
                                            textAlign:'center'
                                        }}><span>{article.ref_article}</span></Col>
                                        <Col s={12} style={{
                                            textAlign:'center'
                                        }}><span className="single-line">{article.designation}</span></Col>
                                        <Col s={11}  style={{
                                            textAlign:'center',
                                            fontSize:18,
                                            fontWeight:700
                                        }}>
                                            <Row className='no-margin'>
                                                <Col>
                                                    <img alt={article.ref_article} style={{
                                                        width:'80px'
                                                    }} src={"data:image/png;base64,"+article.qrcode}/>
                                                </Col>
                                                <Col>
                                                    <img alt={article.ref_article} style={{
                                                        width:'100%'
                                                    }} src={"data:image/png;base64,"+article.barcode}/>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col m={1}>
                                            <Button
                                                flat
                                                small
                                                style={{
                                                    display:'block',
                                                    float:'right'
                                                }}
                                                id={article.ref_article}
                                                onClick={onCheckOrUncheck}
                                                tooltip={article.checked?"Déselectionner":"Selectionner"}
                                                >
                                                    <i id={article.ref_article} className={article.checked?"mdi mdi-checkbox-marked-outline":"mdi mdi-checkbox-blank-outline"}></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </CardPanel>
                            </Col>
                            )
                    }
                    </Row>
                    <Row className="no-padding no-margin">
                        <Button flat style={{float:'right', marginTop:10}} small onClick={onSelectionnerTout}>Selectionner tout</Button>
                        <Button flat style={{float:'right',marginRight:5, marginTop:10}} small onClick={onDeselectionnerTout}>Déselectionner tout</Button>
                    </Row>
                </Col>
                <Col m={3} justify="center" style={{marginBottom:'10px', marginTop:10}}>
                    <Row className="no-margin">
                        <Col m={12} className="content-title-to-print">
                            <span>LES ELEMENTS A IMPRIMER</span>
                        </Col>
                    </Row>
                    <Row 
                        className="content-list-to-print"
                        justify="space-between"
                        style={{
                            overflowY:'auto',
                            marginBottom:'0px',
                            height: 'calc(100vh - 230px )'
                        }}>
                        {
                        liste_articles_selectionnes.map((article,key)=>
                            <Col m={12} key={key}>
                                <CardPanel 
                                    className="card-price"
                                    style={{
                                        marginTop:7,
                                        marginBottom:3
                                    }}
                                    >
                                    <Row justify="center" style={{marginBottom:0}}>
                                        <Col s={9}>
                                            <span className="single-line price-art">{article.designation}</span>
                                        </Col>
                                        <Col m={3} className="no-padding no-margin">
                                            <Button
                                                flat
                                                small
                                                style={{
                                                    display:'block',
                                                    float:'right',
                                                    margin:5
                                                }}
                                                id={article.ref_article}
                                                onClick={onCheckOrUncheck}
                                                >
                                                    <img alt="delete_row_16px" id={article.ref_article} src={delete_row_16px}/>
                                            </Button>
                                        </Col>
                                    </Row>
                                </CardPanel>
                            </Col>
                            )
                        }
                    </Row>
                    <Row className="no-margin no-padding">
                        <Col m={12} className="no-padding no-margin save-as-pdf">
                            {<PDFDownloadLink
                                document={<PDFDocBarCode data={liste_articles_selectionnes} />}
                                fileName={'barcode-'+(new Date()).toLocaleDateString()+'-'+(new Date()).toLocaleTimeString()+'.pdf'}
                                style={{
                                textDecoration: "none",
                                padding: "10px",
                                color: "#4a4a4a",
                                backgroundColor: "#f2f2f2",
                                border: "1px solid #4a4a4a"
                                }}
                            >
                                {({ blob, url, loading, error }) =>
                                loading ? "Chargement..." : "Enrégister sous PDF"
                                }
                            </PDFDownloadLink>}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}