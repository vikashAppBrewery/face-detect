
import './App.css';
import Navigation from './component/navigation/Navigation';
import Logo from './component/logo/Logo';
import UrlInput from './component/urlinput/UrlInput';
import Rank from './component/rank/Rank';
import Particles from 'react-particles-js';
import { Component } from 'react';
// import Clarifai from 'clarifai';
import FaceDetect from './component/facedetect/FaceDetect';
import SignIn from './component/signin/SignIn';
import Register from './component/sinup/Register'


const particlesOptions = 
  {"particles": {
    "number": {
        "value": 200,
        "density": {
            "enable": false
        }
    },
    "size": {
        "value": 3,
        "random": true,
        "anim": {
            "speed": 4,
            "size_min": 0.3
        }
    },
    "line_linked": {
        "enable": false
    },
    "move": {
        "random": true,
        "speed": 1,
        "direction": "top",
        "out_mode": "out"
    }
},
"interactivity": {
    "events": {
        "onhover": {
            "enable": true,
            "mode": "bubble"
        },
        "onclick": {
            "enable": true,
            "mode": "repulse"
        }
    },
    "modes": {
        "bubble": {
            "distance": 250,
            "duration": 2,
            "size": 0,
            "opacity": 0
        },
        "repulse": {
            "distance": 400,
            "duration": 4
        }
    }
}}

const initialState = {
        input : "",
        imageUrl : "",
        box:{},
        route: 'signin' ,
        isSignedIn: false,
        user : {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
    }     
}

// const app = new Clarifai.App({
//     apiKey: '67e9dd0468da492788c5952f3120f310'
//    });

class App extends Component {
    constructor() {
            super();
            this.state = initialState
        }


            loadUser = (data) => {
                this.setState({user: {
                    id : data.id,
                    name: data.name,
                    emai: data.email,
                    entries: data.entries,
                    joined: data.joined
                }})
            } 

            calculateFaceLocation = (data) => {
                const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
                const image = document.getElementById('inputImage');
                const width = Number(image.width);
                const height = Number(image.height);
                return {
                    leftCol: clarifaiFace.left_col * width,
                    topRow: clarifaiFace.top_row * height,
                    rightCol: width - (clarifaiFace.right_col * width),
                    bottomRow: height - (clarifaiFace.bottom_row * height)
                }
            }

            displayFaceBox = (box) => this.setState({box: box})

            onInputChange = (event) => {this.setState({input: event.target.value})}
              
            onButtonSubmit = () => {    
            this.setState({imageUrl: this.state.input})
            fetch('https://obscure-sands-73955.herokuapp.com/imageurl', {
                        method: 'post',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            input: this.state.input
                        })
                    }).then(response => response.json())   
            // app.models.predict("d02b4508df58432fbb84e800597b8959", this.state.input)
            .then(response => {
                if(response){
                    fetch('https://obscure-sands-73955.herokuapp.com/image', {
                        method: 'put',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            id : this.state.user.id
                        })
                    })
                    .then(response => response.json())
                    .then(count => {
                        this.setState(Object.assign(
                            this.state.user, {entries : count}
                        ))
                    }) 
                }
                
                this.displayFaceBox(this.calculateFaceLocation(response))
            })
            .catch(err => console.log(err))
        }

        onRouteChange = ( route ) => {
            if(route === 'signout'){
                this.setState(initialState)
            }else if (route === 'home'){
                this.setState({isSignedIn: true})
            }
                this.setState({route:route})
        }

    render() {   
        const {isSignedIn, imageUrl, box, route} = this.state
  return (
    <div className="App">
      <Particles className="particles"
                params={particlesOptions} />
      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}></Navigation>
      {
          route === 'home' ? <div>
          <Logo></Logo>
          <Rank 
          name={this.state.user.name} 
          entries={this.state.user.entries}>
          </Rank>
          <UrlInput onInputChange={this.onInputChange} onButtonSubmit= {this.onButtonSubmit}></UrlInput>
          <FaceDetect imageUrl={imageUrl} box={box}></FaceDetect>
      </div> : (route === 'signin') ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}></SignIn> : 
      <Register 
      loadUser = {this.loadUser}
      onRouteChange={this.onRouteChange}></Register>
       
      }
    </div>
  )
}
}

export default App;
