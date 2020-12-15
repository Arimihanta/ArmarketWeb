import React,{useState, useEffect} from 'react'
import {Row,Col,CardPanel,Dropdown,Select} from 'react-materialize'
import CustomLine from '../components/charts/CustomLine';
import {LoadDataPage} from './LoadDataPage'
import { format } from 'date-fns'
import {getVentesArticlesGroupByDateASC,getVentesArticlesMensuels,getVentesArticlesAnnuels} from '../services/vente'
import out_of_stock from './../components/img/out_of_stock_24px.png'
import expired from './../components/img/expired_24px.png'

import { colors } from "../global/colors"
import {DateTime,getAbbrMoisLettre} from './../global/date'
import '../global/lib'
const { primary, warning, gray } = colors

const getAnnees=()=>{
    let dt=new Date()
    let res=[]
    for(let i=0 ; i<20 ; i++){
        res[i]=dt.getFullYear()-i
    }
    return res
}

export const DashboardPage=()=>{
    const [isLoad, setLoad]=useState(true)
    const colorActive = ["#9d0191", "#fd3a69"]
    const colorSxActive = ["#9d0191", "#00C49F", "#fd8c04", "#120078"]
    const [liste_ventes_articles_par_jour, setListeVentesArticlesParJour]=useState([])
    const [liste_ventes_articles_mensuels, setListeVentesArticlesMensuels]=useState([])
    const [liste_ventes_articles_annuels, setListeVentesArticlesAnnuels]=useState([])
    const [date_debut, setDateDebut]=useState(getAnnees()[getAnnees().length-1])
    const [date_fin, setDateFin]=useState(getAnnees()[0])
    const [annee_ventes_mensuels, setAnneeVentesMensuels]=useState(getAnnees()[0])
    

    const loadVenteArticleAnnuels=async(a_deb, a_fin)=>{
        const ventes_annuels=await getVentesArticlesAnnuels(a_deb, a_fin)
        if(ventes_annuels){
            let res=[]
            try{
                var i=0
                let ii=0
                if(ventes_annuels.data.length>0){
                    for(i=0 ; i<=(date_fin-date_debut) ; i++){
                        if(ventes_annuels.data[ii].annee===date_debut+i)
                        {
                            res[i]={
                                montant:ventes_annuels.data[ii].montant,
                                name:date_debut+i
                            }
                            ii++
                        }
                        else{
                            res[i]={
                                montant:0,
                                name:date_debut+i
                            }
                        }
                    }
                }
                setListeVentesArticlesAnnuels(res)
            }
            catch(e){
                console.log('Erreur : '+e)
            }
        }
        return Promise.resolve(true)
    }
    const loadVenteArticleMensuels=async(annee)=>{
        const ventes_mensuels=await getVentesArticlesMensuels(annee)
        if(ventes_mensuels){
            let res=[]
            try{
                let ii=0
                var i=0
                if(ventes_mensuels.data.length>0){
                    for(i=0 ; i<12 ; i++){
                        if((ventes_mensuels.data[ii].mois-1)===i){
                            res[i]={
                                montant:ventes_mensuels.data[ii].montant,
                                name:getAbbrMoisLettre(i+1)
                            }
                            ii++
                        }
                        else{
                            res[i]={
                                montant:0,
                                name:getAbbrMoisLettre(i+1)
                            }
                        }
                    }
                }
                else{
                    for(i=0 ; i<12 ; i++){
                        res[i]={
                            montant:0,
                            name:getAbbrMoisLettre(i+1)
                        }
                    }
                }
                setListeVentesArticlesMensuels(res)
            }
            catch(e){
                console.log('Erreur : '+e)
            }
        }
        return Promise.resolve(true)
    }

    useEffect(()=>{
        if(loadVenteArticleMensuels(annee_ventes_mensuels) &&
            loadVenteArticleAnnuels(date_debut,date_fin)){
            setLoad(false)
        }
    },[])

    const onAnneeDebutChange=(e)=>{
        setDateDebut(parseInt(e.target.value))
        loadVenteArticleAnnuels(parseInt(e.target.value),parseInt(date_fin))
    }
    const onAnneeFinChange=(e)=>{
        setDateFin(parseInt(e.target.value))
        loadVenteArticleAnnuels(parseInt(date_debut),parseInt(e.target.value))
    }
    const setAnneeVentesMensuelsClick=(e)=>{
        console.log(e.target.value)
        loadVenteArticleMensuels(parseInt(e.target.value))
        setAnneeVentesMensuels(parseInt(e.target.value))
    }

    const onApplyClick=()=>{
        setLoad(true)
    }
    
    if(isLoad) {
        return(
            <LoadDataPage/>
        )
    }
    return(
        <div style={{ paddingLeft: 20, paddingRight: 20 }}>
            <Row justify="space-between" className="no-margin">
                <Col m={3}>
                    <CardPanel className="peachCard">
                        <Row justify="space-between" className="no-margin no-padding">
                            <span className="text-bold">Stocks epuisés</span>
                        </Row>
                        <Row justify="space-between" className="no-margin no-padding">
                            <Col m={2} className="no-margin no-padding"><img src={out_of_stock}/></Col>
                            <Col m={10} className="no-margin no-padding"><span className="text-bold title right">358</span></Col>
                        </Row>
                    </CardPanel>
                </Col>
                <Col m={3}>
                    <CardPanel className="peachCard">
                        <Row justify="space-between" className="no-margin no-padding">
                            <span className="text-bold">Produits périmés</span>
                        </Row>
                        <Row justify="space-between" className="no-margin no-padding">
                            <Col m={2} className="no-margin no-padding"><img src={expired}/></Col>
                            <Col m={10} className="no-margin no-padding"><span className="text-bold title right">35</span></Col>
                        </Row>
                    </CardPanel>
                </Col>
                <Col m={3}>
                    <CardPanel className="peachCard">
                        <Row justify="space-between" className="no-margin no-padding">
                            <span className="text-bold">Produits périmés</span>
                        </Row>
                        <Row justify="space-between" className="no-margin no-padding">
                            <Col m={2} className="no-margin no-padding"><img src={expired}/></Col>
                            <Col m={10} className="no-margin no-padding"><span className="text-bold title right">35</span></Col>
                        </Row>
                    </CardPanel>
                </Col>
                <Col m={3}>
                    <CardPanel className="peachCard">
                        <Row justify="space-between" className="no-margin no-padding">
                            <span className="text-bold">Produits périmés</span>
                        </Row>
                        <Row justify="space-between" className="no-margin no-padding">
                            <Col m={2} className="no-margin no-padding"><img src={expired}/></Col>
                            <Col m={10} className="no-margin no-padding"><span className="text-bold title right">35</span></Col>
                        </Row>
                    </CardPanel>
                </Col>
            </Row>
            <div
                style={{
                    overflowY:'auto',
                    maxHeight: 'calc(100vh - 180px )'
                }}
                className="scroll"
            >
                <Row>
                    <Col m={6}>
                        <div className="marge">
                            <Row
                                style={{
                                    marginTop:5,
                                    marginBottom:0,
                                    paddingRight:5
                                }}
                            >
                                <Col m={6}>
                                    <span className="text-bold">Taux de vente annuel</span>
                                </Col>
                                <Col m={6} className="input-select">
                                    <Row
                                        style={{
                                            marginTop:0,
                                            marginBottom:0,
                                        }}
                                    >
                                        <Col m={6} className="no-margin pad-2-col">
                                            <Select 
                                                type='select' 
                                                defaultValue={date_debut}
                                                onChange={onAnneeDebutChange}
                                                >
                                                {
                                                    getAnnees().map((x,key)=>
                                                        <option key={key} value={x}>{x}</option>
                                                    )
                                                }
                                            </Select>
                                        </Col>
                                        <Col m={6} className="no-margin pad-2-col">
                                            <Select 
                                                type='select' 
                                                defaultValue={date_fin}
                                                onChange={onAnneeFinChange}
                                                >
                                                {
                                                    getAnnees().map((x,key)=>
                                                        <option key={key} value={x}>{x}</option>
                                                    )
                                                }
                                            </Select>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <CardPanel size="small" bordered={false}>
                                <CustomLine data={liste_ventes_articles_annuels} key1="montant"  color1={primary} />
                            </CardPanel>
                        </div>
                    </Col>
                    <Col m={6}>
                        <div className="marge">
                            <Row
                                style={{
                                    marginTop:5,
                                    marginBottom:0,
                                    paddingRight:5
                                }}
                            >
                                <Col m={9}>
                                    <span className="text-bold">Taux de vente mensuel</span>
                                </Col>
                                <Col m={3} className="input-select no-margin pad-2-col">
                                    <Select 
                                        type='select' 
                                        defaultValue={annee_ventes_mensuels}
                                        onChange={setAnneeVentesMensuelsClick}
                                        >
                                        {
                                            getAnnees().map((x,key)=>
                                                <option key={key} value={x}>{x}</option>
                                            )
                                        }
                                    </Select>
                                </Col>
                            </Row>
                            <CardPanel size="small" bordered={false}>
                                <CustomLine data={liste_ventes_articles_mensuels} key1="montant"  color1={primary} />
                            </CardPanel>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}