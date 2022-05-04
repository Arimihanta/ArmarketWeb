import React,{useState, useEffect} from 'react'
import './../styles/account.css'
import {Modal, Row,Col} from 'react-materialize'
import { Button } from "./../components/Button"
import { setUserSession} from './../services/session'
import {InputTextLogin,InputPasswordLogin} from './../components/InputLogin'
import {getUtilisateurs} from './../services/utilisateur'
import {verify as verifyPassword} from 'password-hash'
import {
    useRecoilState
} from 'recoil';
import {openModalLogin
} from './../global/atom'
import { colors } from "../global/colors"
import './../global/lib'
const {warning} = colors

export const ModalLogin=()=>{
    const [modal_open, setOpenModalLogin] = useRecoilState(openModalLogin);
    const [all_users,setUsers]=useState([])
    const [username,setUsername]=useState('')
    const [password, setPassword]=useState('')
    const [contains_error,setContainsError]=useState(false)
    const [message_error,setMessageError]=useState('')
    const loadUsers=async()=>{
        const response=await getUtilisateurs()
        if(response.data){
            console.log(response.data)
            setUsers(response.data)
        }
        return Promise.resolve(true)
    }

    useEffect(()=>{
        console.log()
        loadUsers()
    },[])

    const onTextInputChange=(e)=>{
        switch(e.target.id){
            case 'pass':
                setPassword(e.target.value)
                return
            case 'username':
                setUsername(e.target.value)
                return
            default : setUsername(e.target.value)
                    return
        }
    }
    const onLoginClick=()=>{
        let user=all_users.find(u=>u.nom===username)
        if(user){
            if(verifyPassword(password,user.pass)){
                let sess={
                    nom:user.nom,
                    isConnected:true
                }
                setUserSession(sess)
                setOpenModalLogin(false)
            }
            else{
                setMessageError("Nom d'utilisateur ou mot de passe incorrecte!")
                setContainsError(true)
            }
        }
        else{
            setMessageError("Aucun utilisateur trouvé!")
            setContainsError(true)
        }
    }

    const onClose=()=>{
        setOpenModalLogin(false)
    }


    return(
        <Modal 
            header='Connexion'
            open={modal_open}
            bottomSheet={false}
            fixedFooter={true}
            actions={<Button small flat className="success" style={{marginRight:25}} onClick={onLoginClick}>Se connecter</Button>}
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
            className='modal-login'
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
            <div style={{
                paddingLeft:20,
                paddingTop:15,
                paddingRight:20,
                paddingBottom:20
            }}>
                <Row>
                    <Col m={12}>
                        <InputTextLogin 
                            m={12}
                            placeholder="Nom d'utilisateur"
                            id="username"
                            onChange={onTextInputChange}
                            autoComplete="off"
                            />
                    </Col>
                    <Col m={12} style={{
                        marginBottom:10
                    }}>
                    </Col>
                    <Col m={12}>
                        <InputPasswordLogin 
                            m={12}
                            placeholder="Mot de passe"
                            id="pass"
                            onChange={onTextInputChange}
                            autoComplete="off"
                            />
                    </Col>
                </Row>
                <label className="message-error" visiblity={contains_error?"visible":"hidden"}>{message_error}</label>
            </div>
        </Modal>
    )
}