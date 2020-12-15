import React,{useState, useEffect} from 'react'
import {Row, Col,Table,Checkbox, Button, TextInput} from 'react-materialize'
import {getAchatsArticles} from '../services/achat_article'
import {LoadDataPage} from './LoadDataPage'
import '../global/lib'
export const HistoriquesAchatArticlePage=()=>{
    const [isLoad, setLoad]=useState(true)
    //list of articles from database
    const [liste_achats_articles, setListeAchatsArticles]=useState([])
    //list of articles filtered
    const [liste_achats_articles_filtrees, setListeAchatsArticlesFiltrees]=useState([])

    useEffect(()=>{
        getAchatsArticles().then(response=>{
            setListeAchatsArticles(response)
            setListeAchatsArticlesFiltrees(response)
            setLoad(false)
        })
    },[])
    
    const onSearchChange  =(e)=>{
        setListeAchatsArticlesFiltrees(
            liste_achats_articles.filter(art=>art.designation.sansAccent().toUpperCase().includes(e.target.value.sansAccent().toUpperCase()))
        )
    }
    
    if(isLoad) {
        return(
            <LoadDataPage/>
        )
    }
    return(
        <div>
            <Row>

            </Row>
            <Row justify="space-between">
                <Col m={2}>
                    <Row>
                        <Button small style={{width:'100%'}}>Nouveau</Button>
                    </Row>
                    <Row>
                        <Button small>Modifier</Button>
                    </Row>
                    <Row>
                        <Button small>Supprimer</Button>
                    </Row>
                </Col>
                <Col m={10}>
                    <Row>
                        <TextInput placeholder='rechercher' onChange={onSearchChange}/>
                    </Row>
                    <Row className='table-article'>
                        <Table
                            hoverable
                            className="scroll"
                        >
                            <thead>
                                <tr>
                                    <th data-field="date_achat">Date</th>
                                    <th data-field="ref_article">Reference</th>
                                    <th data-field="designation">Designation</th>
                                    <th data-field="quantite">Quantite</th>
                                    <th data-field="ref_unite">Unite</th>
                                    <th data-field="prix_vente_unitaire">P.U.</th>
                                    <th data-field="montant">Montant</th>
                                    <th data-field="fournisseur">Fournisseur</th>
                                    <th data-field="option">*</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    liste_achats_articles_filtrees.map((art,key)=>
                                    <tr key={key}>
                                        <td>{art.date_achat}</td>
                                        <td>{art.ref_article}</td>
                                        <td>{art.designation}</td>
                                        <td>{art.quantite}</td>
                                        <td>{art.ref_unite}</td>
                                        <td>{art.prix_achat}</td>
                                        <td>{art.quantite*art.prix_achat}</td>
                                        <td>{art.fournisseur}</td>
                                        <td><Checkbox label="" value={art.ref_article} id={art.ref_article} name={art.ref_article} uncontrolled={true}/></td>
                                    </tr>)
                                }
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th data-field="date_achat">Date</th>
                                    <th data-field="ref_article">Reference</th>
                                    <th data-field="designation">Designation</th>
                                    <th data-field="quantite">Quantite</th>
                                    <th data-field="ref_unite">Unite</th>
                                    <th data-field="prix_vente_unitaire">Prix Unitaire</th>
                                    <th data-field="montant">Montant</th>
                                    <th data-field="fournisseur">Fournisseur</th>
                                    <th data-field="option">*</th>
                                </tr>
                            </tfoot>
                        </Table>
                    </Row>
                    <Row>

                    </Row>
                </Col>
            </Row>
        </div>
    )
}