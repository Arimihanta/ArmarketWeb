import React,{useState, useEffect} from 'react'
import './../styles/account.css'
import {Modal, Row,Col} from 'react-materialize'
import { Button } from "./../components/Button"
import {InputTextLogin,InputPasswordLogin} from './../components/InputLogin'
import {getUtilisateurs,postUtilisateur} from './../services/utilisateur'
import {generate as generateHash} from 'password-hash'
import {
    useRecoilState
} from 'recoil';
import {openModalSignin
} from './../global/atom'
import { colors } from "../global/colors"
import './../global/lib'
const {warning} = colors

export const ModalSignin=()=>{
    const [modal_open, setOpenModalSignin] = useRecoilState(openModalSignin);
    const [all_users,setUsers]=useState([])
    const [username,setUsername]=useState('')
    const [password, setPassword]=useState('')
    const [confirm_password, setConfirmPassword]=useState('')
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
        console.log('Hav : '+generateHash('xoxo'))
        loadUsers()
    },[])

    const onTextInputChange=(e)=>{
        switch(e.target.id){
            case 'pass':
                setPassword(e.target.value)
                return
            case 'confirm_pass':
                setConfirmPassword(e.target.value)
                return
            case 'username':
                setUsername(e.target.value)
                return
            default : return
        }
    }
    const onSigninClick=async()=>{
        let user=all_users.find(u=>u.nom===username)
        if(!user){
            if(!password || !confirm_password || !username){
                setMessageError("Veuillez vérifier les champs.")
                setContainsError(true)
            }
            else{
                if(password===confirm_password){
                    let data={
                        nom:username,
                        pass:generateHash(password)
                    }
                    const post_user=await postUtilisateur(data)
                    if(post_user.data){
                        setOpenModalSignin(false)
                    }
                }
                else{
                    setMessageError("Les deux mots de passe ne sont pas identique!")
                    setContainsError(true)
                }
            }
        }
        else{
            setMessageError("Le nom d'utilisateur est déjà utilisé!")
            setContainsError(true)
        }
    }

    const onClose=()=>{
        setOpenModalSignin(false)
    }


    return(
        <Modal 
            header='Ajout utilisateur'
            open={modal_open}
            bottomSheet={false}
            fixedFooter={true}
            actions={<Button small flat className="success" style={{marginRight:25}} onClick={onSigninClick}>Enrégistrer</Button>}
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
            className='modal-signin'
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

                    <Col m={12} style={{
                        marginBottom:10
                    }}>
                    </Col>
                    <Col m={12}>
                        <InputPasswordLogin
                            m={12}
                            placeholder="Confirmer le mot de passe"
                            id="confirm_pass"
                            onChange={onTextInputChange}
                            autoComplete="off"
                            />
                    </Col>
                    <Col m={12}>
                        <label className="message-error" visiblity={contains_error?"visible":"hidden"}>{message_error}</label>
                    </Col>
                </Row>
                
            </div>
        </Modal>
    )
}