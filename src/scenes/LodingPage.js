import React,{Component } from 'react';
import { View, Image, Text,Dimensions} from 'react-native';
import {Spinner} from 'native-base';
import {FBLogin, FBLoginManager,AccessToken} from 'react-native-facebook-login';
import * as firebase from 'firebase';
var {height, width} = Dimensions.get('window');

export default class LodingPage extends Component {
    constructor(props){
        super(props);
        this.props = props;

        this.state = {
            user: null,
            login: false
        };
    }

    facebooklogin(){    
        this.props.navigator.resetTo({name: "index"})
    }

    componentDidMount(){
        setTimeout(() => {
            if(this.state.login){
                this.props.navigator.resetTo({name: "index" ,index: 0})
            }else{
                this.props.navigator.push({name: "introduce" })
            }
        }, 1500); 
    }

render() {
    _this = this;
    return(
        <View style={{flex: 1,    justifyContent: 'center',    alignItems: 'center'}}>
            <View style={{flex: 1, position: 'absolute'}}>
            <FBLogin
                    ref={(fbLogin) => { this.fbLogin = fbLogin }}
                    permissions={["email","user_friends"]}
                    loginBehavior={FBLoginManager.LoginBehaviors.Native}                    

                    onLoginFound={function(data){
                    console.log("Existing login found.");
                    console.log(data);                        
                    const provider = firebase.auth.FacebookAuthProvider;                    
                    const credential = provider.credential(data.credentials.token);
                    firebase.auth().signInWithCredential(credential);   
                                                                                                 
                    _this.setState({ user : null , login: true });
                    }}
                    onLoginNotFound={function(){
                    console.log("No user logged in.");
                    _this.setState({ user : null , login: false });
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
            </View>
            <View>
            <Image
            style={{width: width, height: height - 20}}
            source={require('../images/main.png')}
            />  
            </View>
            <View style={{flex: 1,
    position: 'absolute',
    alignItems: 'center',
    top: height/2 - 50,
    opacity: 0.5,
    width: width}}>
                <Spinner color='red' />
            </View>

        </View>
    );

}

}