import firebase from 'firebase';
import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Header, Spinner } from './components/common';
import { LoginForm } from './components/LoginForm';

export class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyA5xyn75pFBCRBpj2UYVMR77BpZCCYMML8',
      authDomain: 'auth-840ed.firebaseapp.com',
      databaseURL: 'https://auth-840ed.firebaseio.com',
      projectId: 'auth-840ed',
      storageBucket: 'auth-840ed.appspot.com',
      messagingSenderId: '72981382163',
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  logInOrLogOutScreen() {
    switch (this.state.loggedIn) {
      case true:
        return <Button onPress={() => firebase.auth().signOut()}>Log Out</Button>;
      case false:
        return <LoginForm />;
      default:
        return <Spinner size={'large'} />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.logInOrLogOutScreen()}
      </View>
    );
  }
}
