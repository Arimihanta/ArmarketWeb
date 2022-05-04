import React from 'react'
import help_41px from './../img/help_41px.png'
import {Button,Modal} from 'react-materialize'
import {
    useRecoilState
} from 'recoil';
import {openMessageBox} from './../../global/atom'
export const MessageBox=(props)=>{
    const {type,message}=props
    const [openDialog, setOpenDialog]=useRecoilState(openMessageBox)
    const onClose=()=>{
        setOpenDialog(false)
    }
    return(
        <Modal 
            header={null}
            open={openDialog}
            bottomSheet={false}
            fixedFooter
            actions={<div><button onClick={onClose}>OK</button></div>}
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
                    <img src={logo_armarket}
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
                <img src={help_41px}/>
                <span>Voulez vous vraiment quitter le programme?</span>
            </div>
        </Modal>
    )
}