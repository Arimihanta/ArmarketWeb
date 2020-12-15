import React from 'react' ;
import {Row, Col, TextInput} from 'react-materialize'
export const SearchInputText =(props)=>{
    const {placeholder, onChange, id, name, value, style } = props

    return(
        <Row className="no-margin no-padding search-input-text" style={style}>
            <Col m={1} className="no-margin no-padding">
                <i className="fa fa-search"/>
            </Col>
            <Col m={11} className="no-margin no-padding">
                <input
                    type="text"
                    className="no-margin search-input"
                    placeholder={placeholder} 
                    id={id}
                    onChange={onChange}
                    name={name}
                    value={value}
                    style={{
                        border:'none',
                        width:'100%'
                    }}
                    autoComplete="off"
                    />
            </Col>
        </Row>
    )
}