import React,{useState, useEffect} from 'react'
import 'materialize-css'
import {Row, Col,Table,CardPanel, TextInput, Button as MButton} from 'react-materialize'
import { Button } from "./../components/Button"
import {SearchInputText} from "./../components/SearchInputText"
import add_shopping_cart_16px from './../components/img/add_shopping_cart_16px.png'
import logo_shop_mihaja from './../components/img/logo_shop_mihaja.jpeg'
import {getStocks,getStockParReference,putStockActuel} from './../services/stock'
import {postVente,postFacture,postVenteArticle} from './../services/vente'
import {putTicket} from './../services/ticket'
import {LoadDataPage} from './LoadDataPage'
import delete_row_16px from './../components/img/delete_row_16px.png'
import {getUtilisateur} from './../services/session'
import './../global/lib'
export const MaCaissePage=()=>{
    const [isLoad, setLoad]=useState(true)
    const [stocks_articles, setStocksArticles]=useState([])
    const [stocks_articles_filtres, setStocksArticlesFiltres]=useState([])
    const [search_key, setSearchKey]=useState('')
    const [ventes, setVentes]=useState([]) ;
    const [espece, setEspece]=useState(0)
    const [val_calc,setValCalc]=useState('')
    const [montant, setMontant]=useState(0)
    const [somme_a_rendre, setSommeRendre]=useState(0)

    const loadStock=async()=>{
        const response=await getStocks()
        if(response){
            setStocksArticles(response.data)
            setStocksArticlesFiltres(response.data)
            
        }
        return Promise.resolve(true)
    }
    useEffect(()=>{
        if(loadStock()){
            setLoad(false)
        }
    },[])


    const onSearchChange  =(e)=>{
        setStocksArticlesFiltres(
            stocks_articles.filter(art=>art.designation.sansAccent().toUpperCase().includes(e.target.value.sansAccent().toUpperCase()))
        )
    }

    const addArticleOnList=(reference)=>{
        let art=stocks_articles.find(s=>s.ref_article===reference)
        if(art){
            let vente={
                ref_article:art.ref_article,
                designation:art.designation,
                quantite:1,
                prix_vente_unitaire:art.prix_vente_unitaire,
                ref_unite:art.ref_unite
            }
            let v=ventes.find(v=>v.ref_article===vente.ref_article)
            if(v){
                const newList = ventes.map((item) => {
                    if (item.ref_article === vente.ref_article) {
                      const updatedItem = {
                        ...item,
                        quantite: item.quantite+1,
                      };
                      return updatedItem;
                    }
               
                    return item;
                });
                setVentes(newList)
            }
            else{
                setVentes([...ventes,vente])
            }
            setMontant(montant+vente.prix_vente_unitaire)
            setSearchKey('')
        }
    }

    const onRemoveVenteRow=(e)=>{
        let vts=ventes.filter(x=>x.ref_article!==e.target.id)
        let tot=0 ;
        vts.forEach(art=>{
            tot+=art.prix_vente_unitaire*art.quantite
        })
        setVentes(vts)
        setMontant(tot)
    }

    const onRefArticleChange  =(e)=>{
        setSearchKey(e.target.value)
        addArticleOnList(e.target.value)
    }

    
    const onNewClick=()=>{
        setVentes([])
        setMontant(0)
        setEspece(0)
        setSommeRendre(0)
        setValCalc('')
    }

    const onChiffreCalcClick=(e)=>{
        if(e.target.value===','){
            if(!(val_calc.split('.').length>1) && val_calc){
                setValCalc(val_calc+'.')
            }
        }
        else{
            if(val_calc==='0')setValCalc(e.target.value)
            else setValCalc(val_calc+''+e.target.value)
        }
    }
    const onBackSpaceClick=()=>{
        if(val_calc.length>0){
            setValCalc(val_calc.substring(0,val_calc.length-1))
        }
    }
    const onValCalcChange=(e)=>{
        setValCalc(e.target.value)
    }

    const onAddArticle=(e)=>{
        addArticleOnList(e.target.id)
    }

    const onValidClick=()=>{
        setEspece(parseFloat(val_calc))
        let val=parseFloat(val_calc)-montant
        setSommeRendre(val)
    }
    const onCancelClick=()=>{
        setEspece(0)
        setValCalc('')
        setSommeRendre(0)
    }
    
    const canPay=()=>{
        return true
    }

    const payAsynch=async()=>{
        if(canPay()){
            let insertedVente=await postVente({ref_vente:-1})
            let insertedFacture=await postFacture({ref_facture:-1})
            const date=new Date()
            ventes.forEach(async(v)=>{
                v.ref_vente=insertedVente.data
                v.ref_facture=insertedFacture.data
                v.caissier=getUtilisateur().nom
                v.prix_vente=v.prix_vente_unitaire
                v.date_vente=date.toLocaleDateString()
                await postVenteArticle(v)

                const stockGet=await getStockParReference(v.ref_article)
                let stock=stockGet.data
                console.log(stock)
                stock.stock_actuel=parseFloat(stock.stock_actuel)-parseFloat(v.quantite)
                await putStockActuel(stock)
            })
            
            await putTicket({
                id:1,
                can_print:1,
                ref_vente:insertedVente.data,
                espece:espece
            })
        }else{

        }
        return Promise.resolve(true)
    }

    const onPayClick=()=>{
        if(payAsynch()){
            onNewClick()
        }
    }

    if(isLoad) {
        return(
            <LoadDataPage/>
        )
    }
    return(
        <div style={{ paddingLeft: 20, paddingRight: 20}}>
            <Row justify="space-between" style={{marginBottom:'0px' }}>
                <Col m={2}>
                    <Row  className="search-row">
                        <Col m={12} className="no-margin no-padding" m={12}>
                            
                            <SearchInputText
                                placeholder='rechercher' 
                                id='s-filtrer-article'
                            onChange={onSearchChange}><i className="fa fa-search"></i></SearchInputText>
                            

                        </Col>
                        <Col m={12} 
                            className="no-margin no-padding"
                            >
                            <div 
                            className="liste-article"
                                style={{marginTop:'10px'}}
                            >
                                {
                                    stocks_articles_filtres.map((st, key)=>
                                        <CardPanel
                                            key={key}
                                            style={{
                                                padding:5
                                            }}
                                            className="card-art-caisse"
                                        >
                                            <Row className="no-padding no-margin">
                                                <Col m={12}>
                                                    <span className='nm-art'>{st.designation}</span>
                                                </Col>
                                                <Col m={12}>
                                                    <span className='pr-art'>{st.prix_vente_unitaire}{' '}Ar</span>
                                                </Col>
                                                <Col m={12} className="no-padding no-margin">
                                                    <Button
                                                        flat
                                                        small
                                                        style={{
                                                            display:'block',
                                                            float:'right'
                                                        }}
                                                        
                                                        id={st.ref_article}
                                                        onClick={onAddArticle}
                                                        ><img id={st.ref_article} alt={st.ref_article} src={add_shopping_cart_16px}/>
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </CardPanel>
                                    )
                                }
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col m={7}>
                   <Row className="no-margin">
                        <Col m={4}>
                            <CardPanel className="card-gray">
                                <Row justify="center" style={{marginBottom:0}}>
                                    <Col s={12}><span className="text-bold">TOTAL</span></Col>
                                    <Col s={12}><span className="text-bold title">{montant}{' '}Ar</span></Col>
                                </Row>
                            </CardPanel>
                        </Col>
                       <Col m={4}>
                            <CardPanel className="card-gray">
                                <Row justify="center" style={{marginBottom:0}}>
                                    <Col s={12}><span className="text-bold">ESPECE</span></Col>
                                    <Col s={12}><span className="text-bold title">{espece}{' '}Ar</span></Col>
                                </Row>
                            </CardPanel>
                       </Col>
                       <Col m={4}>
                            <CardPanel className="card-gray">
                                <Row justify="center" style={{marginBottom:0}}>
                                    <Col s={12}><span className="text-bold">SOMME A RENDRE</span></Col>
                                    <Col s={12}><span className="text-bold title">{somme_a_rendre}{' '}Ar</span></Col>
                                </Row>
                            </CardPanel>
                       </Col>
                   </Row>
                   <Row justify="space-between" className="no-margin no-padding">
                        <Col m={6} className="ref-ma-caisse no-margin no-padding">
                            <TextInput 
                                className="no-margin" 
                                style={{
                                    float:'left', 
                                    marginTop:'0px', 
                                    height:'32px'
                                }} 
                                id="search_key" 
                                placeholder="Référence" 
                                onChange={onRefArticleChange} 
                                value={search_key}
                                autocomplete={false}
                                />
                        </Col>
                        <Col m={6}>
                            <Button floating style={{float:'right'}} small onClick={onNewClick} waves='light'><i class="mdi mdi-plus-box-outline"/></Button>
                        </Col>
                   </Row>
                   <Row className='container-table-macaisse'>
                        <Table
                            striped
                            className="scroll table-macaisse"
                            >
                            <thead>
                                <tr>
                                    <th data-field="designation">Designation</th>
                                    <th data-field="quantite">Quantite</th>
                                    <th data-field="ref_unite">Unite</th>
                                    <th data-field="prix_vente_unitaire">Prix Unitaire</th>
                                    <th data-field="montant">Montant</th>
                                    <th data-field="options"></th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    ventes.map((art,key)=>
                                    <tr key={key}>
                                        <td>{art.designation}</td>
                                        <td>{art.quantite}</td>
                                        <td>{art.ref_unite}</td>
                                        <td>{art.prix_vente_unitaire}</td>
                                        <td>{art.prix_vente_unitaire*art.quantite}</td>
                                        <td><MButton 
                                                id={art.ref_article}
                                                style={{
                                                    height:24
                                                }}
                                                flat
                                                onClick={onRemoveVenteRow}
                                                ><img id={art.ref_article} alt="delete_row_16px" src={delete_row_16px}/></MButton></td>
                                    </tr>)
                                }
                            </tbody>
                        </Table>
                   </Row>
                </Col>
                <Col m={3} style={{paddingRight:20}}>
                    <Row>
                        <CardPanel className="p-afficheur-espece peachCard"
                            style={{
                                margin:'5px 0px 0px 0px'
                            }}
                        >
                            <Row justify="center" style={{marginBottom:0}}>
                                <Col s={9}>
                                    <TextInput
                                        className="result-calc"
                                        value={val_calc}
                                        onChange={onValCalcChange}
                                    />
                                </Col>
                                <Col s={3}><span className="result-calc">Ar</span></Col>
                            </Row>
                        </CardPanel>
                    </Row>
                    <Row
                        className='logo-shop'
                    >
                        <img alt="logo_shop_mihaja" src={logo_shop_mihaja}></img>
                    </Row>
                    <Row style={{marginBottom:'0px'}}>
                        <Col m={4} className="cont-calc-num"> <Button className="b-calc-num" onClick={onChiffreCalcClick} value={7}>7</Button></Col>
                        <Col m={4} className="cont-calc-num"> <Button className="b-calc-num" onClick={onChiffreCalcClick} value={8}>8</Button></Col>
                        <Col m={4} className="cont-calc-num"> <Button className="b-calc-num" onClick={onChiffreCalcClick} value={9}>9</Button></Col>
                        <Col m={4} className="cont-calc-num"> <Button className="b-calc-num" onClick={onChiffreCalcClick} value={4}>4</Button></Col>
                        <Col m={4} className="cont-calc-num"> <Button className="b-calc-num" onClick={onChiffreCalcClick} value={5}>5</Button></Col>
                        <Col m={4} className="cont-calc-num"> <Button className="b-calc-num" onClick={onChiffreCalcClick} value={6}>6</Button></Col>
                        <Col m={4} className="cont-calc-num"> <Button className="b-calc-num" onClick={onChiffreCalcClick} value={1}>1</Button></Col>
                        <Col m={4} className="cont-calc-num"> <Button className="b-calc-num" onClick={onChiffreCalcClick} value={2}>2</Button></Col>
                        <Col m={4} className="cont-calc-num"> <Button className="b-calc-num" onClick={onChiffreCalcClick} value={3}>3</Button></Col>
                        <Col m={4} className="cont-calc-num"> <Button className="b-calc-num" onClick={onBackSpaceClick}><i className="mdi mdi-backspace"></i></Button></Col>
                        <Col m={4} className="cont-calc-num"> <Button className="b-calc-num" onClick={onChiffreCalcClick} value={0}>0</Button></Col>
                        <Col m={4} className="cont-calc-num"> <Button className="b-calc-num" onClick={onChiffreCalcClick} value=','>,</Button></Col>
                    </Row>
                </Col>
            </Row>
            <Row justify="space-between">
                <Col m={2}>

                </Col>
                <Col m={7}>
                    <Button style={{float:'right', height:'42px', margin:'2px'}} id="button-payer" onClick={onPayClick} value={ventes}><i className="mdi mdi-cash"></i>PAYER</Button>
                </Col>
                <Col m={3} style={{paddingRight:20}}>
                    <Row>
                        <Col m={8} className="cont-calc-num"> <Button className="b-calc-num b-valid-op" onClick={onValidClick}><i className="mdi mdi-check"></i></Button></Col>
                        <Col m={4} className="cont-calc-num"> <Button className="b-calc-num b-cancel-op" onClick={onCancelClick}>ANNULER</Button></Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}