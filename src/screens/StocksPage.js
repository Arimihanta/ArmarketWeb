import React,{useState, useEffect} from 'react'
import {Row, Col,Table,Select} from 'react-materialize'
import {SearchInputText} from "../components/SearchInputText"
import {getCategoriesArticles} from '../services/article'
import {getStocks} from '../services/stock'
import {LoadDataPage} from './LoadDataPage'
import {NouveauArticle} from './NouveauArticle'
import {
    listeCategoriesArticles} from '../global/atom'
import {
    useRecoilState
} from 'recoil';
import '../global/lib'
export const StocksPage=()=>{
    const [isLoad, setLoad]=useState(true)
    //list of articles from database
    const [liste_articles, setListeArticles]=useState([])
    //list of articles filtered
    const [liste_articles_filtrees, setListeArticlesFiltrees]=useState([])
    const [liste_categories_articles, setListeCategoriesArticles]=useRecoilState(listeCategoriesArticles)
    const [search_key, setSearchKey]=useState('')
    const [selected_filter_item, setSelectedFilterItem]=useState(1)

    const loadStock=async()=>{
        let st=await getStocks()
        if(st){
            console.log(st.data[0].date_avant_peremption.years)
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

    const filterDisplay=(index,search)=>{
        console.log(index)
        switch(parseInt(index)){
            
            case 1:
                setListeArticlesFiltrees(liste_articles.filter(art=>art.designation.sansAccent().toUpperCase().includes(search.sansAccent().toUpperCase())))
                return
            case 2:
                setListeArticlesFiltrees(liste_articles.filter(art=>art.designation.sansAccent().toUpperCase().includes(search.sansAccent().toUpperCase()) &&
                                            art.stock_actuel<=art.seuil_stock_min))
                return
            case 3:
                setListeArticlesFiltrees(liste_articles.filter(art=>art.designation.sansAccent().toUpperCase().includes(search.sansAccent().toUpperCase()) &&
                                            (art.date_avant_peremption.months<2 || !art.date_avant_peremption.months) && !art.date_avant_peremption.years))
                return
        }
    }
    const onSearchChange=(e)=>{
        filterDisplay(selected_filter_item,e.target.value)
        setSearchKey(e.target.value)
    }

    const setClassName=(stock_actuel, marge_min)=>{
        if(stock_actuel<=marge_min) return 'stock-epuise'
        return ''
    }

    const onFilterChange=(e)=>{
        filterDisplay(e.target.value,search_key)
        setSelectedFilterItem(parseInt(e.target.value))
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
                    <Row className="no-margin no-padding">
                        <Col className="no-margin no-padding slect-stock">
                            <Select
                                type='select' 
                                defaultValue={1}
                                onChange={onFilterChange}
                            >
                                <option value={1}>Tous les produits</option>
                                <option value={2}>Stock épuisés</option>
                                <option value={3}>Produits proches d'une date de péremption</option>
                            </Select>
                        </Col>
                    </Row>
                </Col>
                <Col m={3}>
                    <SearchInputText style={{float:'right'}} id="search_key" onChange={onSearchChange} value={search_key} placeholder="Rechercher" />
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