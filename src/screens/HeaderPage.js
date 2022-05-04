import React from 'react'
import { Navbar, NavItem, Row,Col,Button  } from 'react-materialize'
import { colors } from "../global/colors"
import {
  useRecoilState
} from 'recoil';
import {openModalAbout,openModalLogin,openModalSignin,openModalLogout
} from './../global/atom'
import {startUrl,
  caisseUrl,
  articlesUrl,
  historiquesUrl} from './../global/urls'
import {ModalLogin} from './ModalLogin'
import {ModalSignin} from './ModalSignin'
import {ModalLogout} from './ModalLogout'
import{ModalAbout} from './ModalAbout'
import {getUtilisateur} from './../services/session'
const { primary } = colors

export const HeaderPage = () => {
  const [modal_about_open, setOpenModalAbout] = useRecoilState(openModalAbout);
  const [modal_login_open, setOpenModalLogin] = useRecoilState(openModalLogin);
  const [modal_signin_open, setOpenModalSignin] = useRecoilState(openModalSignin);
  const [modal_logout_open, setOpenModalLogout] = useRecoilState(openModalLogout);
  if(!getUtilisateur() || !getUtilisateur().isConnected){
    setOpenModalLogin(true)
    console.log(modal_login_open)
  }
  return(
    <div
      style={{
        background: primary,
        paddingLeft: 20, 
        paddingRight: 20,
        boxShadow:'none',
        display:'inline-flex',
        width:'100%',
    }}
    >
      <Navbar
          style={{
            background: 'transparent',
            boxShadow:'none'
        }}
      >
        <NavItem href={startUrl}>
          <Row style={{marginBottom:0}}>
            <Col style={{paddingLeft:2, paddingRight:2}}><i className="mdi mdi-view-dashboard"/></Col>
            <Col style={{paddingLeft:4, paddingRight:2}}>Tableau de bord</Col>
          </Row>
        </NavItem>
        <NavItem href={caisseUrl}>
          <Row style={{marginBottom:0}}>
            <Col style={{paddingLeft:2, paddingRight:2}}><i className="mdi mdi-home"/></Col>
            <Col style={{paddingLeft:4, paddingRight:2}}>Caisse</Col>
          </Row>
        </NavItem>
        <NavItem href={articlesUrl} className="no-margin">
          <Row style={{marginBottom:0}}>
            <Col style={{paddingLeft:2, paddingRight:2}}><i className="mdi mdi-archive"/></Col>
            <Col style={{paddingLeft:4, paddingRight:2}}>Articles</Col>
          </Row>
        </NavItem>
        <NavItem href={historiquesUrl} className="no-margin">
          <Row style={{marginBottom:0}}>
            <Col style={{paddingLeft:2, paddingRight:2}}><i className="mdi mdi-history"/></Col>
            <Col style={{paddingLeft:4, paddingRight:2}}>Historiques</Col>
          </Row>
        </NavItem>
      </Navbar>
      <div style={{
        float:'right',
        display:'inline-flex'
      }}>
        <Button flat tooltip="A propos"
          style={{
            color:"#ffffff"
          }}
          onClick={()=>{setOpenModalAbout(true)
            console.log(modal_about_open)
          }}
        >
          <i className="mdi mdi-information-outline"></i>
        </Button>{' '}
        <Button flat tooltip="Ajouter un utilisateur"
          style={{
            color:"#ffffff"
          }}
          onClick={()=>{setOpenModalSignin(true)
            console.log(modal_signin_open)
          }}
        >
          <i className="mdi mdi-account-plus"></i>
        </Button>{' '}
        <Button flat tooltip="Se déconnecter"
          style={{
            color:"#ffffff"
          }}
          onClick={()=>{setOpenModalLogout(true)
            console.log(modal_logout_open)
          }}
        >
          <i className="mdi mdi-logout-variant"></i>
        </Button>
      </div>
      <ModalAbout/>
      <ModalLogin/>
      <ModalSignin/>
      <ModalLogout/>
    </div>
  )
}