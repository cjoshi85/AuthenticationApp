import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Card, CardItem, Button, Input, Spinner } from './common';

class LoginForm extends Component {
    state = {
        email: '',
        password: '',
        error: '',
        loading: false
    }

    onLoginSuccess = async () => {
       await this.setState({ 
            error: '',
            email: '',
            password: '', 
            loading: false });
    }

    onLoginFailed = () => {
        this.setState({ 
            error: 'Authentication Failed',
            loading: false });
    }

    loginUser = async () => {
        try {
            this.setState({ error: '', loading: true });
            await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
            await this.onLoginSuccess();
        } catch (error) {
            try {
                await firebase.auth().createUserWithEmailAndPassword(
                    this.state.email, this.state.password);
                await this.onLoginSuccess();
            } catch (err) {
                this.onLoginFailed();
            }
        }
    }

    renderButton = () => {
        if (this.state.loading) {
            return <Spinner />;
        }
        return (
        <Button 
            onPress={() => 
                this.loginUser()}
        >
            Log In
        </Button>
        );
    }

    render() {
        return (
            <Card>
                <CardItem>
                    <Input
                        label='Email'
                        placeholder='abc@gmail.com'
                        value={this.state.email} 
                        onChangeText={email => this.setState({ email })}
                    />
                </CardItem>
                <CardItem>
                <Input
                        label='Password'
                        secureTextEntry
                        placeholder='password'
                        value={this.state.password} 
                        onChangeText={password => this.setState({ password })}
                />
                </CardItem>
                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>
                <CardItem>
                    {this.renderButton()}
                </CardItem>
            </Card>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};

export default LoginForm;
