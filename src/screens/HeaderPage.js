import React from 'react'
import { Navbar, NavItem, Icon, Badge, Row,Col  } from 'react-materialize'
import { colors } from "../global/colors"
import {startUrl,
  caisseUrl,
  articlesUrl,
  historiquesUrl} from './../global/urls'
const { primary } = colors
const path = require('path');

export const HeaderPage = () => {
  return(
    <Navbar
        style={{
          background: primary,
          paddingLeft: 20, 
          paddingRight: 20,
          boxShadow:'none'
      }}
    >
      <NavItem href={startUrl}>
        <Row style={{marginBottom:0}}>
          <Col style={{paddingLeft:2, paddingRight:2}}><i class="mdi mdi-view-dashboard"/></Col>
          <Col style={{paddingLeft:4, paddingRight:2}}>Tableau de bord</Col>
        </Row>
      </NavItem>
      <NavItem href={caisseUrl}>
        <Row style={{marginBottom:0}}>
          <Col style={{paddingLeft:2, paddingRight:2}}><i class="mdi mdi-home"/></Col>
          <Col style={{paddingLeft:4, paddingRight:2}}>Caisse</Col>
        </Row>
      </NavItem>
      <NavItem href={articlesUrl} className="no-margin">
        <Row style={{marginBottom:0}}>
          <Col style={{paddingLeft:2, paddingRight:2}}><i class="mdi mdi-archive"/></Col>
          <Col style={{paddingLeft:4, paddingRight:2}}>Articles</Col>
        </Row>
      </NavItem>
      <NavItem href={historiquesUrl} className="no-margin">
        <Row style={{marginBottom:0}}>
          <Col style={{paddingLeft:2, paddingRight:2}}><i class="mdi mdi-history"/></Col>
          <Col style={{paddingLeft:4, paddingRight:2}}>Historiques</Col>
        </Row>
      </NavItem>
    </Navbar>
  )
}