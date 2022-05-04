import React,{useState, useEffect} from 'react'
import './../styles/account.css'
import {Modal, Row,Col} from 'react-materialize'
import { Button } from "./../components/Button"
import logo_armarket from './../components/img/logo_armarket.png'
import {
    useRecoilState
} from 'recoil';
import {
    openModalAbout
} from './../global/atom'
export const ModalAbout=()=>{
    const [modal_open, setOpenModalAbout] = useRecoilState(openModalAbout);
    const onClose=()=>{
        setOpenModalAbout(false)
    }
    return(
        <Modal 
            header={null}
            open={modal_open}
            bottomSheet={false}
            fixedFooter
            actions={<div><button onClick={onClose}>Fermer</button></div>}
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
            className='modal-close-window modal-about-window'
        >
            <div className="menu-bar">
                <div className="left" role="menu">
                    <img alt="logo_armarket" src={logo_armarket}
                        style={{
                            width:'24px',
                            height:'24px',
                            marginLeft:'10px',
                            marginRight:'10px'
                        }}
                    />
                    <span>A propos</span>
                </div>
                <div className="right">
                    <button className="menubar-btn close-btn" onClick={onClose}><i className="mdi mdi-window-close"></i></button>
                </div>
            </div>
            <div className="cont-message" justify="center">
                <Row justify="space-between" style={{marginBottom:'0px' }}>
                    <Col m={4}>
                        <div className="left" role="menu">
                            <img alt="logo_armarket" src={logo_armarket}
                                style={{
                                    width:'150px',
                                    height:'150px',
                                    marginLeft:'5px',
                                    marginRight:'10px',
                                    marginTop:'80px'
                                }}
                            />
                        </div>
                    </Col>
                    <Col m={8}>
                        <Row>
                            <span className="text-bold title">Armarket</span>
                        </Row>
                        <Row>
                            <span>
                                Armarket est un logiciel de caisse et de gestion de stocks, peut être utilisé dans un point de vente, grossiste, supermarché etc...
                            </span>
                        </Row>
                        <Row style={{marginBottom:'7px' }}>
                            <Col>
                                <span className="text-bold">D&eacute;veloppeur</span>
                            </Col>
                            <Col>
                                <span>Andriambolaharimihanta Havana</span>
                            </Col>
                        </Row>
                        <Row style={{marginBottom:'7px' }}>
                            <Col>
                                <span className="text-bold">Email</span>
                            </Col>
                            <Col>
                                <span>aarimihanta@gmail.com</span>
                            </Col>
                        </Row>
                        <Row style={{marginBottom:'7px' }}>
                            <Col>
                                <span className="text-bold">Contact</span>
                            </Col>
                            <Col>
                                <span>+261 34 11 343 71</span>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </Modal>
    )
}