import React from 'react'
import logo_armarket from './../components/img/logo_armarket.png'
import {Button} from 'react-materialize'
export const MenuBar=()=>{
    return(
        <div id="menu-bar">
            <div class="left" role="menu">
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
            <div class="right">
                <button class="menubar-btn" id="minimize-btn"><i class="mdi mdi-window-minimize"></i></button>
                <button class="menubar-btn" id="max-unmax-btn"><i class="mdi mdi-window-maximize"></i></button>
                <button class="menubar-btn" id="close-btn"><i class="mdi mdi-window-close"></i></button>
            </div>
        </div>
    )
}