import React,{useState, useEffect} from 'react'
import {Row, Col,CardPanel} from 'react-materialize'
import { Button } from "../components/Button"
import { DatePicker } from "../components/DatePicker"
import {LoadDataPage} from './LoadDataPage'
import { format } from 'date-fns'
import {getVentesArticlesGroupByDate} from '../services/vente'
import {DateTime} from './../global/date'
import '../global/lib'
export const VenteParJourPage=()=>{
    const [isLoad, setLoad]=useState(true)
    const [liste_ventes_articles, setListeVentesArticles]=useState([])
    const [date_debut, setDateDebut]=useState('')
    const [date_fin, setDateFin]=useState('')
    const loadVenteArticle=async()=>{
        setLoad(true)
        let dt=new Date()
        const dddd={
            date_debut:date_debut|| '01/01/2000',
            date_fin:date_fin || dt.toLocaleDateString('fr-FR',Intl.DateTimeFormat('fr-FR'))
        }
        if(date_debut && date_fin){
            let dd=new DateTime(date_debut)
            console.log(dd.getDay())
            console.log(dd.getMonth())
            console.log(dd.getYear())
            //console.log('comparer'+dd.compareTo(df))
        }
        
        const insertedValues=await getVentesArticlesGroupByDate(dddd)
        
        if(insertedValues){
            console.log(insertedValues)
            setListeVentesArticles(insertedValues.data)
        }
        return Promise.resolve(true)
    }

    useEffect(()=>{
        if(loadVenteArticle()){
            setLoad(false)
        }
    },[])

    const onApplyClick=()=>{
        setLoad(true)
        if(loadVenteArticle()){
            setLoad(false)
        }
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
                                value={date_debut}
                                onChange={(date)=>setDateDebut(format(date, 'dd/MM/yyyy'))}
                                />
                        </Col>
                        <Col>
                            <DatePicker 
                                label="Au"
                                name="date_fin"
                                id="date_fin"
                                value={date_fin}
                                onChange={(date)=>setDateFin(format(date, 'dd/MM/yyyy'))}
                                />
                        </Col>
                    </Row>
                </Col>
                <Col m={2} style={{padding:'0px'}}>
                    <Button flat style={{float:'right', marginTop:10}} small onClick={onApplyClick} className="success">APPLIQUER</Button>
                </Col>
            </Row>
            <Row style={{
                overflowY:'auto',
                marginBottom:'0px',
                maxHeight: 'calc(100vh - 200px )'
            }}>
            {
                liste_ventes_articles.map((vente,key)=>
                    <Col m={2} key={key}>
                        <CardPanel className="peachCard">
                            <Row justify="center" style={{marginBottom:0}}>
                                <Col s={12} style={{
                                    textAlign:'center'
                                }}><span>{vente.date_vente}</span></Col>
                                <Col s={12}  style={{
                                    textAlign:'center',
                                    fontSize:18,
                                    fontWeight:700
                                }}><span>{vente.montant} {' '}Ar</span></Col>
                            </Row>
                        </CardPanel>
                    </Col>
                    )
            
            }
            </Row>
        </div>
    )
}