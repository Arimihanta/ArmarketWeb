import React,{useState, useEffect} from 'react'
import {Row, Col,Table,Checkbox, TextInput, Icon} from 'react-materialize'
import { Button } from "../components/Button"
import {SearchInputText} from "../components/SearchInputText"
import {getCategoriesArticles} from '../services/article'
import {getStocks} from '../services/stock'
import {LoadDataPage} from './LoadDataPage'
import {NouveauArticle} from './NouveauArticle'
import {ModifierArticle} from './ModifierArticle'
import {
    listeCategoriesArticles} from '../global/atom'
import {
    useRecoilState,
    useRecoilValue,
} from 'recoil';
import { colors } from "../global/colors"
import '../global/lib'
const { primary, warning, gray } = colors
export const StocksPage=()=>{
    const [isLoad, setLoad]=useState(true)
    //list of articles from database
    const [liste_articles, setListeArticles]=useState([])
    //list of articles filtered
    const [liste_articles_filtrees, setListeArticlesFiltrees]=useState([])
    const [liste_categories_articles, setListeCategoriesArticles]=useRecoilState(listeCategoriesArticles)


    const loadStock=async()=>{
        let st=await getStocks()
        if(st){
            setListeArticles(st.data)
            setListeArticlesFiltrees(st.data)
            setLoad(false)
        }
        return Promise.resolve(true)
    }
    useEffect(()=>{
        loadStock()
        if(!liste_categories_articles){
            getCategoriesArticles().then(response=>{
                let res={}
                response.map(cat=>{
                    res={...res,[cat.ref_categorie]:null}
                })
                setListeCategoriesArticles(res)
            })
        }
    },[])
    const onSearchChange  =(e)=>{
        setListeArticlesFiltrees(
            liste_articles.filter(art=>art.designation.sansAccent().toUpperCase().includes(e.target.value.sansAccent().toUpperCase()))
        )
    }

    const setClassName=(stock_actuel, marge_min)=>{
        if(stock_actuel<=marge_min) return 'stock-epuise'
        return ''
    }
    if(isLoad) {
        return(
            <LoadDataPage/>
        )
    }
    return(
        <div style={{ paddingLeft: 20, paddingRight: 20}}>
            <Row justify="center" style={{marginBottom:'0px', marginTop:10}}>
                <Col m={9}>
                    d
                </Col>
                <Col m={3}>
                    <SearchInputText style={{float:'right'}} id="search_key" onChange={onSearchChange} placeholder="Rechercher" />
                </Col>
            </Row>
            <Row justify="space-between">
                <Col m={12}>
                    <Row className='table-article'>
                        <Table
                            hoverable
                            className="scroll"
                        >
                            <thead>
                                <tr>
                                    <th data-field="ref_article">Reference</th>
                                    <th data-field="designation">Designation</th>
                                    <th data-field="ref_categorie">Categorie</th>
                                    <th data-field="ref_sous_categorie">Sous-Categorie</th>
                                    <th data-field="stock_actuel">Quantité dispo</th>
                                    <th data-field="ref_unite">Unité</th>
                                    <th data-field="prix_vente_unitaire">Prix Unitaire</th>
                                    <th data-field="date_peremption">Date de peremption</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    liste_articles_filtrees.map((art,key)=>
                                    <tr key={key} className={setClassName(art.stock_actuel,art.seuil_stock_min)}>
                                        <td>{art.ref_article}</td>
                                        <td>{art.designation}</td>
                                        <td>{art.ref_categorie}</td>
                                        <td>{art.ref_sous_categorie}</td>
                                        <td>{art.stock_actuel}</td>
                                        <td>{art.ref_unite}</td>
                                        <td>{art.prix_vente_unitaire}</td>
                                        <td>{art.date_peremption}</td>
                                    </tr>)
                                }
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th data-field="ref_article">Reference</th>
                                    <th data-field="designation">Designation</th>
                                    <th data-field="ref_categorie">Categorie</th>
                                    <th data-field="ref_sous_categorie">Sous-Categorie</th>
                                    <th data-field="stock_actuel">Quantité dispo</th>
                                    <th data-field="ref_unite">Unite</th>
                                    <th data-field="prix_vente_unitaire">Prix Unitaire</th>
                                    <th data-field="date_peremption">Date de peremption</th>
                                </tr>
                            </tfoot>
                        </Table>
                    </Row>
                </Col>
            </Row>
            <NouveauArticle/>
            
        </div>
    )
}