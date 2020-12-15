import React from 'react'
import { HashRouter, Route } from "react-router-dom";
import { MenuBar  } from './MenuBar'
import { HeaderPage  } from './HeaderPage'
import {DashboardPage} from './DashboardPage'
import {MaCaissePage} from './MaCaissePage'
import {ContainerArticle} from './ContainerArticle'
import {ContainerHistoriques} from './ContainerHistoriques'


const path = require('path');

export const HomePage = () => {
  
  return(
    <HashRouter>
      <MenuBar/>
      <HeaderPage />
      <Route path='/ma-caisse' component={ MaCaissePage } />
      <Route path='/articles'  component={ ContainerArticle } />
      <Route path='/historiques' component={ ContainerHistoriques} />
      <Route path="/" exact component={ DashboardPage } />
    </HashRouter>
  )
}