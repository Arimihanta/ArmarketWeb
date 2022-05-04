import React from 'react'
import {Modal} from 'react-materialize'
import { Button } from "./../components/Button"
import {
    useRecoilState
} from 'recoil';
import {
    openModalLogout
} from './../global/atom'
import {restaurerSession} from './../services/session'
import { colors } from "../global/colors"
import './../global/lib'
const { warning } = colors

export const ModalLogout=()=>{
    const [modal_logout_open, setOpenModalLogout] = useRecoilState(openModalLogout);
    const onClose=()=>{
        setOpenModalLogout(false)
    }

    const onLogout=async()=>{
        restaurerSession()
        setOpenModalLogout(false)
        window.location='/#/'
    }

    return(
        <Modal 
            open={modal_logout_open}
            actions={<Button flat onClick={onLogout} small className="success">Se déconnecter</Button>}
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
        <label style={{fontSize:14}}>Voulez-vous se déconnecter ?</label>
            </div>
        </Modal>
    )
}