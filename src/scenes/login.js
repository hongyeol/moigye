import React, { Component } from 'react';
import { View , TextInput, StyleSheet, Alert, Image,BackAndroid} from 'react-native';
import { Container, Content, List, ListItem, InputGroup, Button, Icon,Input, Text,Spinner} from 'native-base';
import myTheme from '../themes/light';
import * as firebase from 'firebase';
import {FBLogin, FBLoginManager,AccessToken} from 'react-native-facebook-login';


export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        email: '',
        password: '',  
        user: '',
        uid: null
    };       
        auth = firebase.auth().getRedirectResult;
        this.signup = this.signup.bind(this);
        this.facebooklogin = this.facebooklogin.bind(this);
    }

    _logincheck(){
        if(this.state.id === ''){
            Alert.alert('ID','ID를 입력해주세요');
        }else if(this.state.password === ''){
            Alert.alert('비밀번호','비밀번호를 입력해주세요');
        }else{
            //this.props.navigator.push({name: 'index'})
        }
    }

    async login() {

            try {                
                await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);               

                setTimeout(() => {
                    this.props.navigator.push({
                        name: "index"
                    })
                }, 1500);

            } catch (error) {
                alert(error.toString());
                this.setState({
                    response: error.toString()
                })
            }

        }

    signup() {

        try {                  
            setTimeout(() => {                
                var uid = firebase.auth().currentUser.uid;
                var name = firebase.auth().currentUser.displayName;                
            
                firebase.database().ref("Register/"+ uid ).set({
                    Name: name 
                })

                this.props.navigator.push({
                            name: "index"
                        })
            }, 1500);    
            
        } catch (error) {
           setTimeout(() => {
                var uid = firebase.auth().currentUser.uid;
                var name = firebase.auth().currentUser.displayName;                
            
                firebase.database().ref("Register/"+ uid ).set({
                    Name: name 
                })

                this.props.navigator.push({
                            name: "index"
                        })
            }, 1500);  
        }
    }

    facebooklogin(){    
        this.props.navigator.resetTo({name: "index"})
    }

  

    render() {
        var _this = this;

        return(
            <Container theme={myTheme}>   
            <Image
            style={{width: 360, height: 320}}
            source={require('../images/login.png')}
            />               
                <Content>              
                <InputGroup>
                <Icon name='ios-person'/>
                <Input placeholder='EMAIL'                 
                onChangeText= {(text) => this.setState({email: text
                            })
                        }                                 
                />
                </InputGroup>
                <InputGroup>
                <Icon name='ios-unlock'/>
                <Input placeholder='PASSWORD' secureTextEntry={true} 
                onChangeText= {(text) => this.setState({password: text
                            })
                        }
                
                />
                </InputGroup>                                
                <Button block style={styles.button} onPress={this.login.bind(this)}>로 그 인</Button>
                <Button block  onPress={() => {this.props.navigator.push({name: 'register'})}}>회 원 가 입</Button>
                <FBLogin
                    ref={(fbLogin) => { this.fbLogin = fbLogin }}
                    permissions={["email","user_friends"]}
                    loginBehavior={FBLoginManager.LoginBehaviors.Native}                    
                    onLogin={function(data){
                    console.log("Logged in!");
                    console.log(data);
                    _this.setState({ user : data.credentials });
                    

                    const provider = firebase.auth.FacebookAuthProvider;                    
                    const credential = provider.credential(data.credentials.token);
                    
                    firebase.auth().signInWithCredential(credential);

                    _this.signup();           
                    }}

                    onLogout={function(){
                    console.log("Logged out.");
                    _this.setState({ user : null });
                    firebase.auth().signOut();
                    }}

                    onLoginFound={function(data){
                    console.log("Existing login found.");
                    console.log(data);                        

                    const provider = firebase.auth.FacebookAuthProvider;                    
                    const credential = provider.credential(data.credentials.token);
                    firebase.auth().signInWithCredential(credential);                                                                                
                    alert(credential)
                              //_this.facebooklogin();
                    }}
                    onLoginNotFound={function(){
                    console.log("No user logged in.");
                    _this.setState({ user : null });
                    }}
                    onError={function(data){
                    console.log("ERROR");
                    console.log(data);
                    }}
                    onCancel={function(){
                    console.log("User cancelled.");
                    }}
                    onPermissionsMissing={function(data){
                    console.log("Check permissions!");
                    console.log(data);
                    }}
                />            
                </Content>
            </Container>
        );
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1        ,
        justifyContent: 'center'        
    },
    button:{
         flex: 1   ,
        backgroundColor: '#FF0000',
        borderColor: '#FFFFFF',        
        justifyContent: 'center'       
    }
})