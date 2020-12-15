import React,{useState, useEffect} from 'react'
import {Row, Col,Table, Icon} from 'react-materialize'
import {SearchInputText} from "./../components/SearchInputText"
import { Button } from "../components/Button"
import edit_16px from './../components/img/edit_16px.png'
import buy_16px from './../components/img/buy_16px.png'
import {getCategoriesArticles} from '../services/article'
import {getStocks,getStockParReference} from '../services/stock'
import {LoadDataPage} from './LoadDataPage'
import {NouveauArticle} from './NouveauArticle'
import {ModifierArticle} from './ModifierArticle'

import {
    useRecoilState,
    useRecoilValue,
} from 'recoil';
import {openDialogNouveauArticle, 
    openDialogModifierArticle,
    listeArticles, 
    listeCategoriesArticles,
    listeSousCategoriesArticles,
    propsArticle} from '../global/atom'
import { colors } from "../global/colors"
import '../global/lib'
const { primary, warning, gray } = colors
export const ListeArticlesPage=()=>{
    const [isLoad, setLoad]=useState(true)
    //list of articles from database
    const [liste_articles, setListeArticles]=useRecoilState(listeArticles)
    const [liste_categories_articles, setListeCategoriesArticles]=useRecoilState(listeCategoriesArticles)
    //list of articles filtered
    const [liste_articles_filtrees, setListeArticlesFiltrees]=useState([])
    const [dialog_nouveau_article, setOpenDialogNouveauArticle] = useRecoilState(openDialogNouveauArticle);
    const [dialog_modifier_article, setOpenDialogModifierArticle] = useRecoilState(openDialogModifierArticle);
    const [props_art,setPropsArt]=useRecoilState(propsArticle)

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
        getCategoriesArticles().then(response=>{
            let res={}
            response.map(cat=>{
                res={...res,[cat.ref_categorie]:null}
            })
            setListeCategoriesArticles(res)
        })
    },[])
    
    const asynchronousN=async()=>{
        await setPropsArt(
            {
                ref_article: '', 
                designation: '', 
                ref_categorie: '', 
                ref_sous_categorie: '', 
                ref_unite: '',
                prix_vente_unitaire:0
            })
        return Promise.resolve(true)
    }
    const onNouveauArticleClick=()=>{
        asynchronousN().then(response=>{
            setOpenDialogNouveauArticle(true)
        })
    }
    const onSearchChange  =(e)=>{
        setListeArticlesFiltrees(
            liste_articles.filter(art=>art.designation.sansAccent().toUpperCase().includes(e.target.value.sansAccent().toUpperCase()))
        )
    }

    const setArticle=async(id)=>{
        console.log('button clicked : '+id)
        const art=await getStockParReference(id)
        await setPropsArt(art.data)
        return Promise.resolve(true)
    }
    const onAchatClick=(e)=>{
        let id=e.target.id
        setArticle(id).then(response=>{
            setOpenDialogNouveauArticle(true)
        })
        
    }

    const onModifierClick=(e)=>{
        let id=e.target.id
        if(setArticle(id)){
            console.log(props_art)
            setOpenDialogModifierArticle(true)
        }
    }
    
    if(isLoad) {
        return(
            <LoadDataPage/>
        )
    }
    return(
        <div style={{ paddingLeft: 20, paddingRight: 20}}>
            <Row justify="center" style={{marginBottom:'0px',marginTop:10}}>
                <Col m={10}>
                    <SearchInputText style={{float:'left', width:200}} id="search_key" onChange={onSearchChange} placeholder="Rechercher" />
                </Col>
                <Col m={2}>
    <Button flat style={{float:'right'}} small onClick={onNouveauArticleClick}><i class="mdi mdi-plus-box-outline"/> {'  '}Nouveau</Button>
                </Col>
            </Row>
            <Row justify="space-between">
                <Col m={12}>
                    <Row className='table-article'>
                        <Table
                            striped
                            hoverable
                            className="scroll"
                        >
                            <thead>
                                <tr>
                                    <th data-field="ref_article">Reference</th>
                                    <th data-field="designation">Designation</th>
                                    <th data-field="ref_categorie">Categorie</th>
                                    <th data-field="ref_sous_categorie">Sous-Categorie</th>
                                    <th data-field="ref_unite">Unite</th>
                                    <th data-field="prix_vente_unitaire">Prix Unitaire</th>
                                    <th data-field="option">Options</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    liste_articles_filtrees.map((art,key)=>
                                    <tr key={key}>
                                        <td>{art.ref_article}</td>
                                        <td>{art.designation}</td>
                                        <td>{art.ref_categorie}</td>
                                        <td>{art.ref_sous_categorie}</td>
                                        <td>{art.ref_unite}</td>
                                        <td>{art.prix_vente_unitaire}</td>
                                        <td>
                                            <div
                                            justify='space-between'
                                                style={{
                                                    display:'inline-block',
                                                    width:'100%'
                                                }}
                                            >
                                                <Button 
                                                    id={art.ref_article}
                                                    small 
                                                    flat
                                                    floating
                                                    color={gray}
                                                    className='bt-edit-item'
                                                    onClick={onModifierClick}
                                                    >
                                                    <img id={art.ref_article} src={edit_16px}/>
                                                </Button>
                                                <Button 
                                                    small 
                                                    flat
                                                    floating
                                                    color={gray}
                                                    id={'sup-'+art.ref_article}
                                                    value={art.ref_article}
                                                    className='bt-delete-item'
                                                    ><i className="mdi mdi-delete"/>
                                                </Button>
                                                <Button 
                                                    id={art.ref_article}
                                                    small 
                                                    flat
                                                    floating
                                                    color={gray}
                                                    className='bt-buy-item'
                                                    onClick={onAchatClick}
                                                    >
                                                        <img id={art.ref_article} src={buy_16px}/>
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>)
                                }
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th data-field="ref_article">Reference</th>
                                    <th data-field="designation">Designation</th>
                                    <th data-field="ref_categorie">Categorie</th>
                                    <th data-field="ref_sous_categorie">Sous-Categorie</th>
                                    <th data-field="ref_unite">Unite</th>
                                    <th data-field="prix_vente_unitaire">Prix Unitaire</th>
                                    <th data-field="option">Options</th>
                                </tr>
                            </tfoot>
                        </Table>
                    </Row>
                </Col>
            </Row>
            <NouveauArticle/>
            <ModifierArticle/>
        </div>
    )
}