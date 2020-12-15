import React,{useState, useEffect} from 'react'
import {Modal, Row, Col, TextInput, Autocomplete, Icon } from 'react-materialize'
import { DatePicker } from "../components/DatePicker"
import { Button } from "./../components/Button"
import { format } from 'date-fns'
import {
    useRecoilState,
    useRecoilValue
} from 'recoil';
import {
    getCategoriesArticles,
    postCategoriesArticle,
    getSousCategoriesArticles, 
    postSousCategoriesArticle, 
    getUnitesArticles,
    postUnitesArticle,
    postArticle
} from './../services/article'
import {
    getAchat,
    postAchat
} from './../services/achat'
import {
    postAchatArticle
} from './../services/achat_article'
import {
    postStock,
    putStockActuel,
    getStockParReference
} from './../services/stock'
import {openDialogNouveauArticle, 
    listeArticles,
    listeCategoriesArticles,
    listeSousCategoriesArticles,
    listeUnitesArticles,
    propsArticle
} from './../global/atom'
import {isValidNumber, isValidText} from './../global/lib'
import { colors } from "../global/colors"
import './../global/lib'
const { primary, warning } = colors
export const NouveauArticle=(props)=>{
    const [dialog_nouveau_article, setOpenDialogNouveauArticle] = useRecoilState(openDialogNouveauArticle);
    const [props_article, setPropsArticle]=useRecoilState(propsArticle)
    const [liste_articles, setListeArticles]=useRecoilState(listeArticles)
    const [liste_categories_articles, setListeCategoriesArticles]=useRecoilState(listeCategoriesArticles)
    const [liste_sous_categories_articles, setListeSousCategoriesArticles]=useRecoilState(listeSousCategoriesArticles)
    const [liste_unites_articles, setListeUnitesArticles]=useRecoilState(listeUnitesArticles)
    const [local_categorie, setLocalCategorie]=useState([])
    const [local_sous_categorie, setLocalSousCategorie]=useState([])
    const [local_unite, setLocalUnite]=useState([])
    /*
        Attributs article
    */
    const [date_achat, setDateAchat]=useState('')
    const [ref_article, setRefArticle]=useState('')
    const [designation, setDesignation]=useState('')
    const [ref_categorie, setRefCategorie]=useState('')
    const [ref_sous_categorie, setRefSousCategorie]=useState('')
    const [ref_unite, setRefUnite]=useState('')
    const [quantite, setQuantite]=useState(0)
    const [prix_achat, setPrixAchat]=useState(0)
    const [prix_vente_unitaire, setPrixVenteUnitaire]=useState(0)
    const [fournisseur, setFournisseur]=useState('')
    const [prix_achat_total, setPrixAchatTotal]=useState(0)
    const [date_peremption, setDatePeremption]=useState('')
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
    }, [])

    useEffect(()=>{
        console.log(props_article)
        setRefArticle(props_article.ref_article||'')
        setDesignation(props_article.designation||'')
        setRefCategorie(props_article.ref_categorie||'')
        setRefSousCategorie(props_article.ref_sous_categorie||'')
        setRefUnite(props_article.ref_unite||'')
        setPrixVenteUnitaire(props_article.prix_vente_unitaire||0)
        
    },[props_article])
    const onCloseClick=()=>{
        setOpenDialogNouveauArticle(false)
    }
    const onTextInputChange=(e)=>{
        switch(e.target.id){
            case 'designation' :
                setDesignation(e.target.value)
                return
            case 'ref_categorie' :
                setRefCategorie(e.target.value)
                return
            case 'ref_sous_categorie' :
                setRefSousCategorie(e.target.value)
                return
            case 'ref_unite' :
                setRefUnite(e.target.value)
                return
            case 'quantite' :
                setQuantite(parseFloat(e.target.value))
                if(prix_achat_total){
                    let pu=parseFloat(prix_achat_total)/parseFloat(e.target.value)
                    setPrixAchat(pu)
                }
                if(prix_achat){
                    let pt=parseFloat(prix_achat)*parseFloat(e.target.value)
                    setPrixAchatTotal(pt)
                }
                return
            case 'prix_achat' :
                setPrixAchat(parseFloat(e.target.value))
                if(prix_achat){
                    let pt_=parseFloat(e.target.value)*parseFloat(quantite)
                    setPrixAchatTotal(pt_)
                }
                return
            case 'prix_vente_unitaire' :
                setPrixVenteUnitaire(parseFloat(e.target.value))
                return
            case 'fournisseur' :
                setFournisseur(e.target.value)
                return

            case 'prix_achat_total' :
                setPrixAchatTotal(parseFloat(e.target.value))
                if(prix_achat_total){
                    let pu_=parseFloat(e.target.value)/parseFloat(quantite)
                    setPrixAchat(pu_)
                }
                return
        }
    }

    const onRefArticleChange=(e)=>{
        setRefArticle(e.target.value)
        let article=liste_articles.find(art=>art.ref_article===e.target.value)
        if(article){
            setDesignation(article.designation)
            setRefCategorie(article.ref_categorie)
            setRefSousCategorie(article.ref_sous_categorie)
            setRefUnite(article.ref_unite)
            setPrixVenteUnitaire(article.prix_vente_unitaire)
        }
    }

    const isValidForm=()=>{
        if(!isValidText(ref_article) ||
            !isValidText(designation) ||
            !isValidText(ref_categorie) ||
            !isValidText(ref_sous_categorie) ||
            !isValidText(ref_unite) ||
            !isValidText(fournisseur) ||
            !date_achat ||
            !date_peremption ||
            !isValidNumber(quantite) ||
            !isValidNumber(prix_achat) ||
            !isValidNumber(prix_achat_total) ||
            !isValidNumber(prix_vente_unitaire)){
            return false
        }
        return true
    }
    const restaurerForm=()=>{
        setDateAchat('')
        setRefArticle('')
        setDesignation('')
        setRefCategorie('')
        setRefSousCategorie('')
        setRefUnite('')
        setQuantite(0)
        setPrixAchat(0)
        setPrixVenteUnitaire(0)
        setFournisseur('')
        setPrixAchatTotal(0)
        setDatePeremption('')
        setOpenDialogNouveauArticle(false)
    }

    //sauvegarder
    const onSaveClick=async()=>{
        if(!prix_vente_unitaire){
            let p_=parseFloat(prix_achat)+parseFloat(prix_achat)*20/100
            setPrixVenteUnitaire(p_)
        }
        if(isValidForm()){
            setContainsError(false)
            //inserer categorie si !existe
            if(!(local_categorie.find(cat=>cat.ref_categorie.sansAccent().toUpperCase()===ref_categorie.sansAccent().toUpperCase()))){
                const insertedCategorie=await postCategoriesArticle({ref_categorie:ref_categorie})
            }

            //inserer sous-categorie si !existe
            if(!(local_sous_categorie.find(cat=>cat.ref_sous_categorie.sansAccent().toUpperCase()===ref_sous_categorie.sansAccent().toUpperCase()))){
                const insertedSousCategorie=await postSousCategoriesArticle({ref_sous_categorie:ref_sous_categorie})
            }

            //inserer unite si !existe
            if(!(local_unite.find(unit=>unit.ref_unite.sansAccent().toUpperCase()===ref_unite.sansAccent().toUpperCase()))){
                
                const insertedUnite=await postUnitesArticle({ref_unite:ref_unite})
            }

            //inserer article si !existe
            if(!(liste_articles.find(art=>art.ref_article===ref_article))){
                let article={
                    ref_article:ref_article,
                    designation : designation,
                    ref_categorie:ref_categorie,
                    ref_sous_categorie:ref_sous_categorie,
                    ref_unite:ref_unite,
                    prix_vente_unitaire:prix_vente_unitaire
                }
                const insertedArticle=await postArticle(article)
                let stock={
                    ref_article:ref_article,
                    stock_actuel:quantite,
                    date_peremption:date_peremption,
                    seuil_stock_min:5
                }
                var insertedStock=await postStock(stock)
            }
            else{
                //faire mise a jour
                const stockGet=await getStockParReference(ref_article)
                let stock=stockGet.data
                stock.stock_actuel=parseFloat(stock.stock_actuel)+parseFloat(quantite)
                var updatedStock=await putStockActuel(stock)
            }

            //inserer achat

            const insertedAchat = await postAchat({ref_achat:-1})
            let achat_article={
                ref_article:ref_article,
                prix_achat:prix_achat,
                quantite:quantite,
                date_achat:date_achat,
                ref_achat:insertedAchat.data,
                fournisseur:fournisseur
            }
            console.log(achat_article)
            const insertedAchatArticle=await postAchatArticle(achat_article)

            if(insertedAchatArticle){
                restaurerForm()
            }
        }
        else{
            setContainsError(true)
        }
    }
    return(
        <Modal
            header='Nouveau'
            open={dialog_nouveau_article}
            actions={<div><Button onClick={restaurerForm}>Annuler</Button>{' '}<Button onClick={onSaveClick}>Enregistrer</Button></div>}
            bottomSheet={false}
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
                onClick={onCloseClick}
            ><i className="mdi mdi-close"/></Button>
            <div>
                <Row justify="space-between">
                    <Col m={3}>
                        <DatePicker 
                            label="Date"
                            name="date_achat"
                            id="date_achat"
                            onChange={(date)=>setDateAchat(format(date, 'dd/MM/yyyy'))}
                            />
                    </Col>
                    <Col m={3}>
                        <TextInput 
                            label="Reference"
                            id="ref_article"
                            onChange={onRefArticleChange}
                            value={ref_article}
                            />
                    </Col>
                    <Col m={3}>
                        <TextInput 
                            label="Designation"
                            id="designation"
                            onChange={onTextInputChange}
                            value={designation}
                            />
                    </Col>
                    <Col m={3}>
                        <Autocomplete
                            name="ref_categorie"
                            id="ref_categorie"
                            onChange={onTextInputChange}
                            options={{
                                data: liste_categories_articles,
                                onAutocomplete:(e)=>setRefCategorie(e)
                            }}
                            value={ref_categorie}
                            title="Categorie"
                            />
                    </Col>
                    <Col m={3}>
                        <Autocomplete
                            name="ref_sous_categorie"
                            id="ref_sous_categorie"
                            onChange={onTextInputChange}
                            options={{
                                data: liste_sous_categories_articles,
                                onAutocomplete:(e)=>setRefSousCategorie(e)
                            }}
                            value={ref_sous_categorie}
                            title="Sous-Categorie"
                            autocomplete={false}
                            />
                    </Col>
                    <Col m={3}>
                        <TextInput 
                            type="number" 
                            label="Quantité"
                            name="quantite"
                            id="quantite"
                            onChange={onTextInputChange}
                            value={quantite}
                            />
                    </Col>
                    <Col m={3}>
                        <Autocomplete
                            name="ref_unite"
                            id="ref_unite"
                            onChange={onTextInputChange}
                            options={{
                                data: liste_unites_articles,
                                onAutocomplete:(e)=>setRefUnite(e)
                            }}
                            title="Unite"
                            value={ref_unite}
                            />
                    </Col>
                    <Col m={3}>
                        <DatePicker 
                            label="Date de péremption"
                            name="date_peremption"
                            id="date_peremption"
                            onChange={(date)=>setDatePeremption(format(date, 'dd/MM/yyyy'))}
                            />
                    </Col>
                    <Col m={3}>
                        <TextInput 
                            type="number" 
                            label="Prix Unitaire"
                            name="prix_achat"
                            id="prix_achat"
                            onChange={onTextInputChange}
                            value={prix_achat}
                            />
                    </Col>
                    <Col m={3}>
                        <TextInput 
                            type="number" 
                            label="Prix Total"
                            name="prix_achat_total"
                            id="prix_achat_total"
                            onChange={onTextInputChange}
                            value={prix_achat_total}
                            />
                    </Col>
                    <Col m={3}>
                        <TextInput 
                            type="number" 
                            label="P.U. Vente"
                            name="prix_vente_unitaire"
                            id="prix_vente_unitaire"
                            onChange={onTextInputChange}
                            value={prix_vente_unitaire}
                            />
                    </Col>
                    <Col m={3}>
                        <TextInput 
                            label="Fournisseur"
                            id="fournisseur"
                            onChange={onTextInputChange}
                            value={fournisseur}
                            />
                    </Col>
                </Row>
                <span style={{visibility: contains_error?'visible':'hidden'}}>Erreur!</span>
            </div>
        </Modal>
    )
}