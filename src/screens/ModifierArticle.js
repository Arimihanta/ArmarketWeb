import React,{useState, useEffect} from 'react'
import {Modal, Row, Col, TextInput, Autocomplete, Icon, DatePicker } from 'react-materialize'
import { Button } from "./../components/Button"
import {
    useRecoilState,
    useRecoilValue
} from 'recoil';
import {openDialogModifierArticle, 
    listeCategoriesArticles,
    listeSousCategoriesArticles,
    listeUnitesArticles,
    propsArticle
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
import {isValidNumber, isValidText} from './../global/lib'
import { colors } from "../global/colors"
import './../global/lib'
const { primary, warning, gray } = colors
export const ModifierArticle=(props)=>{
    const [dialog_modifier_article, setOpenDialogModifierArticle] = useRecoilState(openDialogModifierArticle);
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
    }, [])

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
        }
    }

    return(
        <Modal 
            header={props_article.designation}
            open={dialog_modifier_article}
            actions={<div><Button onClick={onClose}>Annuler</Button>{' '}<Button>Enregistrer</Button></div>}
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
            className='modal-article'
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
                                />
                        </Col>
                        <Col m={3}>
                            <TextInput 
                                label="Designation"
                                id="modif_designation"
                                onChange={onTextInputChange}
                                value={modif_designation}
                                />
                        </Col>
                        <Col m={3}>
                            <Autocomplete
                                name="ref_categorie"
                                id="modif_ref_categorie"
                                onChange={onTextInputChange}
                                options={{
                                    data: liste_categories_articles,
                                    onAutocomplete:(e)=>setRefCategorie(e)
                                }}
                                value={modif_ref_categorie}
                                title="Categorie"
                                />
                        </Col>
                        <Col m={3}>
                            <Autocomplete
                                name="ref_sous_categorie"
                                id="modif_ref_sous_categorie"
                                onChange={onTextInputChange}
                                options={{
                                    data: liste_sous_categories_articles,
                                    onAutocomplete:(e)=>setRefSousCategorie(e)
                                }}
                                value={modif_ref_sous_categorie}
                                title="Sous-Categorie"
                                />
                        </Col>
                        <Col m={3}>
                            <Autocomplete
                                name="ref_unite"
                                id="modif_ref_unite"
                                onChange={onTextInputChange}
                                options={{
                                    data: liste_unites_articles,
                                    onAutocomplete:(e)=>setRefUnite(e)
                                }}
                                title="Unite"
                                value={modif_ref_unite}
                                />
                        </Col>
                        <Col m={3}>
                            <TextInput 
                                type="number" 
                                label="P.U. Vente"
                                name="prix_vente_unitaire"
                                id="modif_prix_vente_unitaire"
                                onChange={onTextInputChange}
                                value={modif_prix_vente_unitaire}
                                />
                        </Col>
                    </Row>
                </div>
              
        </Modal>
    )
}