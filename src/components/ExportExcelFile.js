import React from "react";
import ReactExport from "react-export-excel";
import { Button } from "./Button"

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export const ExportExcelFile=(props)=> {
    const {data, date_debut, date_fin}=props
    return (
        <ExcelFile element={<Button flat small>ENRéGISTRER</Button>}>
            <ExcelSheet data={data} name={"Vente du "+date_debut+" au "+date_fin}>
                <ExcelColumn 
                    label="Référence" 
                    value="ref_article"
                    />
                <ExcelColumn label="Désignation" value="designation"/>
                <ExcelColumn label="Catégorie" value="ref_categorie"/>
                <ExcelColumn label="Sous-Catégorie" value="ref_sous_categorie"/>
                <ExcelColumn label="Quantité" value="units"/>
                <ExcelColumn label="Unité" value="ref_unite"/>
                <ExcelColumn label="Prix Unitaire" value={(col)=>parseInt(col.montant/col.units)}/>
                <ExcelColumn label="Montant" value="montant"/>
            </ExcelSheet>
        </ExcelFile>
    );
}