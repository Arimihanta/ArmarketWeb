import React,{useState, useEffect} from 'react'
import {Modal, Row, Col, TextInput, Autocomplete} from 'react-materialize'
import { Button } from "./../components/Button"
import {
    useRecoilState
} from 'recoil';
import {openDialogModifierArticle, 
    listeCategoriesArticles,
    listeSousCategoriesArticles,
    listeUnitesArticles,
    propsArticle,
    listeArticles
} from './../global/atom'
import {
    getCategoriesArticles,
    postCategoriesArticle,
    getSousCategoriesArticles, 
    postSousCategoriesArticle, 
    getUnitesArticles,
    postUnitesArticle,
    putArticle
} from './../services/article'
import {
    getStocks,
    putMargeMinStock,
    getStockParReference
}from './../services/stock'
import {isValidNumber, isValidText} from './../global/lib'
import { colors } from "../global/colors"
import './../global/lib'
const { warning } = colors
export const ModifierArticle=(props)=>{
    const [dialog_modifier_article, setOpenDialogModifierArticle] = useRecoilState(openDialogModifierArticle);
    const [liste_articles, setListeArticles]=useRecoilState(listeArticles)
    const [props_article, setPropsArticle]=useRecoilState(propsArticle)
    const [liste_categories_articles, setListeCategoriesArticles]=useRecoilState(listeCategoriesArticles)
    const [liste_sous_categories_articles, setListeSousCategoriesArticles]=useRecoilState(listeSousCategoriesArticles)
    const [liste_unites_articles, setListeUnitesArticles]=useRecoilState(listeUnitesArticles)
    const [local_categorie, setLocalCategorie]=useState([])
    const [local_sous_categorie, setLocalSousCategorie]=useState([])
    const [local_unite, setLocalUnite]=useState([])
    const [modif_designation, setDesignation]=useState()
    const [modif_ref_categorie, setRefCategorie]=useState('')
    const [modif_ref_sous_categorie, setRefSousCategorie]=useState('')
    const [modif_ref_unite, setRefUnite]=useState('')
    const [modif_seuil_stock_min, setMargeMin]=useState(0)
    const [modif_prix_vente_unitaire, setPrixVenteUnitaire]=useState(0)
    const [contains_error,setContainsError]=useState(false)

    useEffect(() => {
        getCategoriesArticles().then(response=>{
            setLocalCategorie(response)
            let res={}
            response.map(cat=>{
                res={...res,[cat.ref_categorie]:null}
            })
            setListeCategoriesArticles(res)
        })
        getSousCategoriesArticles().then(response=>{
            setLocalSousCategorie(response)
            let res={}
            response.map(cat=>{
                res={...res,[cat.ref_sous_categorie]:null}
            })
            setListeSousCategoriesArticles(res)
        })
        getUnitesArticles().then(response=>{
            setLocalUnite(response)
            let res={}
            response.map(cat=>{
                res={...res,[cat.ref_unite]:null}
            })
            setListeUnitesArticles(res)
        })
        setDesignation(props_article.designation)
        setRefCategorie(props_article.ref_categorie)
        setRefSousCategorie(props_article.ref_sous_categorie)
        setRefUnite(props_article.ref_unite)
        setMargeMin(props_article.seuil_stock_min)
        setPrixVenteUnitaire(props_article.prix_vente_unitaire)
    }, [props_article])

    const loadStock=async()=>{
        let st=await getStocks()
        if(st){
            setListeArticles(st.data)
            console.log(liste_articles)
        }
        return Promise.resolve(true)
    }

    const onClose=()=>{
        setOpenDialogModifierArticle(false)
    }

    const onTextInputChange=(e)=>{
        switch(e.target.id){
            case 'modif_designation' :
                setDesignation(e.target.value)
                return
            case 'modif_ref_categorie' :
                setRefCategorie(e.target.value)
                return
            case 'modif_ref_sous_categorie' :
                setRefSousCategorie(e.target.value)
                return
            case 'modif_ref_unite' :
                setRefUnite(e.target.value)
                return
            case 'modif_prix_vente_unitaire' :
                setPrixVenteUnitaire(parseFloat(e.target.value))
                return
            case 'modif_seuil_stock_min' :
                setMargeMin(parseFloat(e.target.value))
                return
        }
    }

    const isValidForm=()=>{
        if(
            !isValidText(modif_designation) ||
            !isValidText(modif_ref_categorie) ||
            !isValidText(modif_ref_sous_categorie) ||
            !isValidText(modif_ref_unite) ||
            !isValidNumber(modif_seuil_stock_min) ||
            !isValidNumber(modif_prix_vente_unitaire)
            
            ){
                console.log('designation : '+isValidText(modif_designation))
                console.log('modif_ref_categorie : '+isValidText(modif_ref_categorie))
                console.log('modif_ref_sous_categorie : '+isValidText(modif_ref_sous_categorie))
                console.log('modif_ref_unite : '+isValidText(modif_ref_unite))
                console.log('modif_seuil_stock_min : '+isValidNumber(modif_seuil_stock_min))
                console.log('modif_prix_vente_unitaire : '+isValidNumber(modif_prix_vente_unitaire))
            return false
        }
        return true
    }

    //sauvegarder
    const onSaveClick=async()=>{
        if(isValidForm()){
            setContainsError(false)
            //inserer categorie si !existe
            if(!(local_categorie.find(cat=>cat.ref_categorie.sansAccent().toUpperCase()===modif_ref_categorie.sansAccent().toUpperCase()))){
                const insertedCategorie=await postCategoriesArticle({ref_categorie:modif_ref_categorie})
                console.log(insertedCategorie)
            }

            //inserer sous-categorie si !existe
            if(!(local_sous_categorie.find(cat=>cat.ref_sous_categorie.sansAccent().toUpperCase()===modif_ref_sous_categorie.sansAccent().toUpperCase()))){
                const insertedSousCategorie=await postSousCategoriesArticle({ref_sous_categorie:modif_ref_sous_categorie})
                console.log(insertedSousCategorie)
            }

            //inserer unite si !existe
            if(!(local_unite.find(unit=>unit.ref_unite.sansAccent().toUpperCase()===modif_ref_unite.sansAccent().toUpperCase()))){
                
                const insertedUnite=await postUnitesArticle({ref_unite:modif_ref_unite})
                console.log(insertedUnite)
            }

            let article={
                ref_article:props_article.ref_article,
                designation : modif_designation,
                ref_categorie:modif_ref_categorie,
                ref_sous_categorie:modif_ref_sous_categorie,
                ref_unite:modif_ref_unite,
                prix_vente_unitaire:modif_prix_vente_unitaire
            }
            const insertedArticle=await putArticle(article)
            console.log(insertedArticle)

            //faire mise a jour
            const stockGet=await getStockParReference(props_article.ref_article)
            let stock=stockGet.data
            stock.modif_seuil_stock_min=parseFloat(modif_seuil_stock_min)
            const updatedStock=await putMargeMinStock(stock)

            if(updatedStock){
                loadStock()
                setOpenDialogModifierArticle(false)
            }
        }
        else{
            setContainsError(true)
        }
    }

    return(
        <Modal 
            header={props_article.designation}
            open={dialog_modifier_article}
            actions={<div><Button onClick={onClose}>Annuler</Button>{' '}<Button onClick={onSaveClick}>Modifier</Button></div>}
            bottomSheet={false}
            fixedFooter
            options={{
                dismissible: false,
                endingTop: "15%",
                inDuration: 250,
                onCloseEnd: null,
                onCloseStart: null,
                onOpenEnd: null,
                onOpenStart: null,
                opacity: 0.5,
                outDuration: 250,
                preventScrolling: true,
                startingTop: "6%"
            }}
            className='modal-modif-article'
            >
                <Button
                flat
                floating
                small
                style={{
                    display:'block',
                    float:'right',
                    marginTop:'5px',
                    position:'fixed',
                    top:'5px',
                    right:'5px'
                }}
                    color={warning}
                    onClick={onClose}
                ><i className="mdi mdi-close"/>
                </Button>
                <div>
                    <Row justify="space-between">
                        <Col m={3}>
                            <TextInput 
                                label="Reference"
                                id="modif_ref_article"
                                disabled
                                value={props_article.ref_article}
                                autoComplete="off"
                                />
                        </Col>
                        <Col m={3}>
                            <TextInput 
                                label="Designation"
                                id="modif_designation"
                                onChange={onTextInputChange}
                                value={modif_designation}
                                autoComplete="off"
                                />
                        </Col>
                        <Col m={3}>
                            <Autocomplete
                                name="modif_ref_categorie"
                                id="modif_ref_categorie"
                                onChange={onTextInputChange}
                                options={{
                                    data: liste_categories_articles,
                                    onAutocomplete:(e)=>setRefCategorie(e)
                                }}
                                value={modif_ref_categorie}
                                title="Categorie"
                                autoComplete="off"
                                />
                        </Col>
                        <Col m={3}>
                            <Autocomplete
                                name="modif_ref_sous_categorie"
                                id="modif_ref_sous_categorie"
                                onChange={onTextInputChange}
                                options={{
                                    data: liste_sous_categories_articles,
                                    onAutocomplete:(e)=>setRefSousCategorie(e)
                                }}
                                value={modif_ref_sous_categorie}
                                title="Sous-Categorie"
                                autoComplete="off"
                                />
                        </Col>
                        <Col m={3}>
                            <Autocomplete
                                name="modif_ref_unite"
                                id="modif_ref_unite"
                                onChange={onTextInputChange}
                                options={{
                                    data: liste_unites_articles,
                                    onAutocomplete:(e)=>setRefUnite(e)
                                }}
                                title="Unite"
                                value={modif_ref_unite}
                                autoComplete="off"
                                />
                        </Col>
                        <Col m={3}>
                            <TextInput 
                                type="number" 
                                label="P.U. Vente"
                                name="modif_prix_vente_unitaire"
                                id="modif_prix_vente_unitaire"
                                onChange={onTextInputChange}
                                value={modif_prix_vente_unitaire}
                                autoComplete="off"
                                />
                        </Col>
                        <Col m={3}>
                            <TextInput 
                                type="number" 
                                label="Marge de stock min."
                                name="modif_seuil_stock_min"
                                id="modif_seuil_stock_min"
                                onChange={onTextInputChange}
                                value={modif_seuil_stock_min}
                                autoComplete="off"
                                />
                        </Col>
                    </Row>
                    <div className="container-message" style={{visibility:contains_error?'visible':'hidden'}}>
                        <div
                            style={{
                                color:"#ff0000",
                                float:'right'
                            }}
                            onClick={()=>setContainsError(false)}
                            ><i style={{
                                width:16,
                                height:16,
                            }} className="mdi mdi-close"/>
                        </div>
                        <div className="message">
                            <span>Veuillez vérifier le champ</span>
                        </div>
                    </div>
                </div>
                
              
        </Modal>
    )
}