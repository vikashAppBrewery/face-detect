import React from 'react';
import './facedetect.css'


const FaceDetect = ({imageUrl, box}) => {
    return <div className="center ma">
        <div className="absolute mt5">
            <div className="input-image">
            <img id= "inputImage" width="500px" height="auto" src = {imageUrl} alt = " " />
            </div>
            <div className="bounding-box" style={{top:box.topRow, right:box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
            </div>
        </div>
    
}

export default FaceDetect