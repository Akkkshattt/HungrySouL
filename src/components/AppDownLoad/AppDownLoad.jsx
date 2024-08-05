import React from 'react'
import "./AppDownLoad.css"
import { assets } from '../../assets/assets'

const AppDownLoad = () => {
  return (
    <div className='appDownload' id='appDownload'>
        <p>For Better Experience Download<br/>Hungry Soul</p>
        <div className="app-download-plateforms">
            <img src={assets.play_store} alt="" />
            <img src={assets.app_store} alt="" />
        </div>
    </div>
  )
}

export default AppDownLoad