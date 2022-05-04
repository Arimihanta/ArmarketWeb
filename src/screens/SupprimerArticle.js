import React from 'react'
import {Modal} from 'react-materialize'
import { Button } from "./../components/Button"
import {
    useRecoilState
} from 'recoil';
import {openDialogSupprimerArticle,
    propsArticle,
    listeArticles
} from './../global/atom'
import {
    deleteArticleById
} from './../services/article'
import {
    deleteStockParReference,
    getStocks
}from './../services/stock'
import {
    deleteVenteArticleByArticle
}from './../services/vente'
import {
    deleteAchatsArticlesByArticle
}from './../services/achat_article'
import { colors } from "../global/colors"
import './../global/lib'
const { warning } = colors

export const SupprimerArticle=()=>{
    const [dialog_supprimer_article, setOpenDialogSupprimerArticle] = useRecoilState(openDialogSupprimerArticle);
    //list of articles from database
    const [liste_articles, setListeArticles]=useRecoilState(listeArticles)
    console.log(liste_articles)
    const [props_art,setPropsArt]=useRecoilState(propsArticle)
    const onClose=()=>{
        setOpenDialogSupprimerArticle(false)
    }

    const loadStock=async()=>{
        let st=await getStocks()
        if(st){
            setListeArticles(st.data)
        }
        return Promise.resolve(true)
    }


    const onDeleteClick=async()=>{
        const delete_achat=await deleteAchatsArticlesByArticle(props_art.ref_article)
        console.log(delete_achat)
        const delete_vente=await deleteVenteArticleByArticle(props_art.ref_article)
        console.log(delete_vente)
        const delete_stock=await deleteStockParReference(props_art.ref_article)
        console.log(delete_stock)
        const delete_article=await deleteArticleById(props_art.ref_article)
        if(delete_article){
            loadStock()
            setOpenDialogSupprimerArticle(false)
        }
    }

    return(
        <Modal 
            open={dialog_supprimer_article}
            actions={<div><Button onClick={onClose} small>Annuler</Button>{' '}<Button onClick={onDeleteClick} small>Supprimer</Button></div>}
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
            className='modal-suppr-article'
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
                <span>Voulez-vous supprimer</span>{' '}<span className='text-bold'>{props_art.designation}</span>{' '}<span>?</span>
            </div>
        </Modal>
    )
}