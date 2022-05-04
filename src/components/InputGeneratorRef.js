import React from 'react' ;
import {TextInput,Button} from 'react-materialize'
import key_16px from './img/key_16px.png'
export const InputGeneratorRef =(props)=>{
    const {placeholder,label, onChange, id, name, value, style,onGenerateClick } = props

    return(
        <div className="col">
            <div className="container-generator-ref-input" style={style}>
                <TextInput
                        type="text"
                        label={label}
                        className="no-margin generator-ref-input"
                        placeholder={placeholder} 
                        id={id}
                        onChange={onChange}
                        name={name}
                        value={value}
                        autoComplete="off"
                        />
                <Button flat onClick={onGenerateClick} tooltip="Générer une référence pour le produit"><img alt="genkey" src={key_16px}/></Button>
            </div>
        </div>
    )
}