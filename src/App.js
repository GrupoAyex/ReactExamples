import React, { Component } from "react";
//import logo from "./logo.svg";
//import "./App.css";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import {
  Button,
  ButtonToolbar,
  Label,
  Image,
  Thumbnail,
  Well,
  Collapse
} from "react-bootstrap";

firebase.initializeApp({
  apiKey: "AIzaSyD7iquVux21qnTQuwUs-TbZD9zJEgsH3io",
  authDomain: "signin-1547299131770.firebaseapp.com",
  databaseURL: "https://signin-1547299131770.firebaseio.com",
  projectId: "signin-1547299131770",
  storageBucket: "signin-1547299131770.appspot.com",
  messagingSenderId: "304014922937"
});

class App extends Component {
  state = { isSignedIn: false };
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  };

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user });
      console.log("user", user);
    });
  };

  render() {
    return (
      <div className="App">
        <div>
          {this.state.isSignedIn ? (
            <Thumbnail src={firebase.auth().currentUser.photoURL} alt="100x100">
              <h1>Bienvenido {firebase.auth().currentUser.displayName}</h1>
              <ButtonToolbar>
                <Button
                  bsStyle="primary"
                  bsSize="large"
                  onClick={() => this.setState({ open: !this.state.open })}
                >
                  Show Information
                </Button>
                <Button
                  bsStyle="danger"
                  bsSize="large"
                  onClick={() => firebase.auth().signOut()}
                >
                  Sign out!
                </Button>
              </ButtonToolbar>
              <div>
                <Collapse in={this.state.open}>
                  <div className="well">
                    <Well>
                      <span>
                        Teléfono: {firebase.auth().currentUser.phoneNumber}
                      </span>
                    </Well>
                    <Well>
                      <span>Email: {firebase.auth().currentUser.email}</span>
                    </Well>
                    <Well>
                      <span>
                        Email Verificado:
                        {firebase.auth().currentUser.emailVerified}
                      </span>
                    </Well>
                    <Well>
                      <span>UID: {firebase.auth().currentUser.uid}</span>
                    </Well>

                    <Well>
                      Ultimo Signin:
                      {firebase.auth().currentUser.metadata.lastSignInTime}
                    </Well>
                    <Well>
                      Fecha Creacion:
                      {firebase.auth().currentUser.metadata.creationTime}
                    </Well>
                    <Well>
                      ID Proveedor: {firebase.auth().currentUser.providerId}
                    </Well>
                    <Well> Nombre Aplicacion: {firebase.auth().app.name}</Well>
                  </div>
                </Collapse>
              </div>
              {/* <Image src={firebase.auth().currentUser.photoURL} rounded /> */}
            </Thumbnail>
          ) : (
            <div className="well" style={wellStyles}>
              <Label bsStyle="primary">LOGIN TESTING</Label>{" "}
              <StyledFirebaseAuth
                uiConfig={this.uiConfig}
                firebaseAuth={firebase.auth()}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;

const wellStyles = {
  maxWidth: 400,
  margin: "0 auto 10px",
  marginTop: 50
};

const divStyle = {
  flex: "2",
  flexDirection: "column",
  alignSelf: "streatch",
  display: "flex",
  marginTop: 20
};

const login = {
  borderWidth: 1
};
