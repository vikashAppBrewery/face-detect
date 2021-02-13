import React from 'react';
import './urlinput.css'

const UrlInput = ({onInputChange, onButtonSubmit}) => {
    return <div className="mt5">
        <p className="f4">Put your image url to detect face in given image</p>
        <div className="center form-search">
        <div className=' forms center pa4 mt2 br3 shadows-5'>
            <input className="pa4 w-70 center input-form" type="text" placeholder="Insert URL" onChange= {onInputChange}></input>
            <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple" onClick={onButtonSubmit}>Detect Face</button>
        </div>
        </div>
        
    </div>
}

export default UrlInput