import React from 'react';


const Navigation = ({onRouteChange, isSignedIn}) => {
    if(isSignedIn){
        return (<nav style={{display:"flex", justifyContent:'flex-end'}}>
        <p onClick={() => onRouteChange('signout')} className="f3 link hover-purple pa3 underline pointer"> SignOut</p>
    </nav>)
    }else {
        return (<nav style={{display:"flex", justifyContent:'flex-end'}}>
            <p onClick={() => onRouteChange('signin')} className="f3 link hover-purple pa3 underline pointer"> SignIn</p>
            <p onClick={() => onRouteChange('register')} className="f3 link hover-purple pa3 underline pointer"> Register</p>
         </nav>
        )
    }
}

export default Navigation;