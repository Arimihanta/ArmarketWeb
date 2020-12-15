import React,{useState, useEffect} from 'react'
import {Row, Col,Table} from 'react-materialize'
import { Button } from "../components/Button"
import { DatePicker } from "../components/DatePicker"
import {getVentesArticlesByIntervalleDate} from '../services/vente'
import {getLettreDuChiffre} from '../services/conversion'
import {LoadDataPage} from './LoadDataPage'
import { format } from 'date-fns'
import { colors } from "../global/colors"
import '../global/lib'
const { primary, warning, gray } = colors
export const ListeVentesPage=()=>{
    const [isLoad, setLoad]=useState(true)
    //list of articles from database
    const [liste_ventes_articles, setListeVentesArticles]=useState([])
    const [date_debut, setDateDebut]=useState('')
    const [date_fin, setDateFin]=useState('')
    const [total_montant, setTotalMontant]=useState({})
    const loadVenteArticle=async()=>{
        setLoad(true)
        let dt=new Date()
        const dddd={
            date_debut:date_debut|| '01/01/2000',
            date_fin:date_fin || dt.toLocaleDateString('fr-FR',Intl.DateTimeFormat('fr-FR'))
        }
        const insertedValues=await getVentesArticlesByIntervalleDate(dddd)
        
        if(insertedValues){
            var t=0
            insertedValues.data.forEach(item=>{
                t+=item.montant
            })
            
            setListeVentesArticles(insertedValues.data)
            setLoad(false)
        }
        const lettre_chiffre=await getLettreDuChiffre(t)
        if(lettre_chiffre){
            setTotalMontant(lettre_chiffre.data)
        }
        return Promise.resolve(true)
    }

    useEffect(()=>{
        loadVenteArticle()
    },[])

    const onApplyClick=()=>{
        setLoad(true)
        loadVenteArticle()
    }
    
    if(isLoad) {
        return(
            <LoadDataPage/>
        )
    }
    return(
        <div style={{ paddingLeft: 20, paddingRight: 20}}>
            <Row justify="center" style={{marginBottom:'0px'}}>
                <Col m={10}>
                    <Row style={{marginBottom:'0px'}}>
                        <Col style={{ paddingLeft: 0}}>
                            <DatePicker 
                                label="Du"
                                name="date_debut"
                                id="date_debut"
                                onChange={(date)=>setDateDebut(format(date, 'dd/MM/yyyy'))}
                                />
                        </Col>
                        <Col>
                            <DatePicker 
                                label="Au"
                                name="date_fin"
                                id="date_fin"
                                onChange={(date)=>setDateFin(format(date, 'dd/MM/yyyy'))}
                                />
                        </Col>
                    </Row>
                </Col>
                <Col m={2} style={{padding:'0px'}}>
                    <Button flat style={{float:'right', marginTop:10}} small onClick={onApplyClick}>APPLIQUER</Button>
                </Col>
            </Row>
            <Row justify="space-between" style={{marginBottom:'0px'}}>
                <Col m={12}>
                    <Row className='table-article' style={{marginBottom:'0px'}}>
                        <Table
                            striped
                            hoverable
                            className="scroll"
                        >
                            <thead>
                                <tr>
                                    <th data-field="ref_article">Reference</th>
                                    <th data-field="designation">Designation</th>
                                    <th data-field="quantite">Quantité</th>
                                    <th data-field="ref_unite">Unite</th>
                                    <th data-field="montant">Montant</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    liste_ventes_articles.map((art,key)=>
                                    <tr key={key}>
                                        <td>{art.ref_article}</td>
                                        <td>{art.designation}</td>
                                        <td>{art.units}</td>
                                        <td>{art.ref_unite}</td>
                                        <td>{art.montant}</td>
                                    </tr>)
                                }
                            </tbody>
                        </Table>
                    </Row>
                </Col>
            </Row>
            <Row justify="space-between" className="recap-table" style={{marginBottom:'0px', color:'#FFFFFF'}}>
                <Col>
                    <span style={{
                        fontSize:14,
                        fontWeight:700
                    }}>TOTAL : </span>
                </Col>
                <Col>
                    <span style={{
                        fontSize:14,
                        fontWeight:500
                    }}>{total_montant.format_montant}{' '}Ar</span>
                </Col>
                <Col>
                    <span style={{
                        fontSize:14,
                        fontWeight:700
                    }}>SOIT</span>
                </Col>
                <Col>
                    <span style={{
                        fontSize:14,
                        fontWeight:500
                    }}>{total_montant.lettre}</span>{' '}Ariary
                </Col>
            </Row>
        </div>
    )
}