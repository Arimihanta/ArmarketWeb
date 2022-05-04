import React, {useState} from 'react'
import logo_armarket from './../components/img/logo_armarket.png'
import help_41px from './../components/img/help_41px.png'

import {Modal} from 'react-materialize'

export const MenuBar=()=>{
    const [openDialog,setOpenDialog]=useState(false)
    const onClose=()=>{
        setOpenDialog(false)
    }
    const onOpen=()=>{
        setOpenDialog(true)
    }
    return(
        <div>
            <div className="menu-bar" id="menu-bar">
                <div className="left" role="menu">
                    <img alt="logo_armarket" src={logo_armarket}
                        style={{
                            width:'24px',
                            height:'24px',
                            marginLeft:'10px',
                            marginRight:'10px'
                        }}
                    />
                    <span>Armarket</span>
                </div>
                <div className="right">
                    <button className="menubar-btn" id="minimize-btn"><i className="mdi mdi-window-minimize"></i></button>
                    <button className="menubar-btn" id="max-unmax-btn"><i className="mdi mdi-window-maximize"></i></button>
                    <button className="menubar-btn close-btn" onClick={onOpen}><i className="mdi mdi-window-close"></i></button>
                </div>
            </div>
            <Modal 
                header={null}
                open={openDialog}
                bottomSheet={false}
                fixedFooter
                actions={<div><button onClick={onClose}>NON</button>{' '}<button id="close-btn">OUI</button></div>}
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
                className='modal-close-window'
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
                        <span>Armarket</span>
                    </div>
                    <div className="right">
                        <button className="menubar-btn close-btn" onClick={onClose}><i className="mdi mdi-window-close"></i></button>
                    </div>
                </div>
                <div className="cont-message" justify="center">
                    <img alt="help_41px" src={help_41px}/>
                    <span>Voulez vous vraiment quitter le programme?</span>
                </div>
            </Modal>
        </div>
    )
}