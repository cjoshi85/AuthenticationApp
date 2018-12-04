import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner, CardItem } from './components/common';
import { config } from './config';
import LoginForm from './components/LoginForm';


export default class App extends Component {

  state = {
    loggedIn: null
  }
  componentWillMount() {
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({
          loggedIn: false
        });
      }
    });
  }
  
  renderForm = () => {
    switch (this.state.loggedIn) {
      case true:
            return (
              <CardItem>
                <Button onPress={() => firebase.auth().signOut()}>
                      Log Out
                </Button>
              </CardItem>);
      case false:
            return <LoginForm />;
      default:
            return <Spinner />;
    }
  }
  render() {
    return (
      <View>
        <Header headerText={'Authentication App'} />
        {this.renderForm()}
      </View>
    );
  }
}

