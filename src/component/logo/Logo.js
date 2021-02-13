import React from 'react';
import Tilt from 'react-tilt';
import './logo.css';
import Vlogo from './vlogo.png'


const Logo =( ) => {
    return <div className="ma4 mt0">
        <Tilt className="Tilt hr2 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
            <div className="Tilt-inner pa3"> <img  alt ="logo" src={Vlogo} /> </div>
        </Tilt>
    </div>
}

export default Logo