import React,{useEffect, useState} from 'react'
import {Row, Col, CardPanel} from 'react-materialize'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { Button } from "./../components/Button"
import {SearchInputText} from "../components/SearchInputText"
import logo_shop_mihaja from './../components/img/logo_shop_mihaja.png'
import delete_row_16px from './../components/img/delete_row_16px.png'
import {getArticles} from '../services/article'
import {LoadDataPage} from './LoadDataPage'
import {PDFDocPrice} from './../components/PDFDocPrice'
export const PriceArticlePage=()=>{
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
            const newList = st.data.map(item => {
                const updatedItem = {
                    ...item,
                    checked: false,
                };
                //console.log(updatedItem)
                return updatedItem;
            });
            setListeArticles(newList)
            setListeArticlesFiltrees(newList)
            setLoad(false)
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
                        height: 'calc(100vh - 230px )'
                    }}>
                    {
                        liste_articles_filtrees.map((article,key)=>
                            <Col m={6} key={key}>
                                <CardPanel className="card-price">
                                    <Row justify="center" style={{marginBottom:0}}>
                                        <Col s={3}>
                                            <img alt='logo' src={logo_shop_mihaja}></img>
                                        </Col>
                                        <Col s={9}>
                                            <Row className="no-margin no-padding">
                                                <Col className="no-margin no-padding" m={12}>
                                                    <span className="single-line price-art">{article.designation}</span>
                                                </Col>
                                                <Col className="no-margin no-padding" m={12}>
                                                    <Row className="no-margin no-padding" m={12}>
                                                        <Col m={9} className="no-padding no-margin"><span className="price-art price-value">{article.prix_vente_unitaire}{' '}Ar</span></Col>
                                                        <Col m={3} className="no-padding no-margin">
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
                                                </Col>
                                            </Row>
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
                                                    <img id={article.ref_article} alt="delete_row_16px" src={delete_row_16px}/>
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
                                document={<PDFDocPrice data={liste_articles_selectionnes} />}
                                fileName={'price-'+(new Date()).toLocaleDateString()+'-'+(new Date()).toLocaleTimeString()+'.pdf'}
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