import React, { Component } from 'react';
import { View,BackAndroid, Alert} from 'react-native';
import { Container, Content, List, ListItem, InputGroup, Button, Icon,Input, Text,Picker} from 'native-base';

import myTheme from '../themes/light';
const Item = Picker.Item;

import * as firebase from 'firebase';

export default class Register extends Component{
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            phone: '',
            gender: '01',
            selectedItem: undefined,
            response: "",
            results: {
                items: [],
            },
        };
        //this.signup.bind(this);
        //this.connect = Connect.child('Register');
    }


    onValueChange(value) {
        this.setState({
            gender: value,
        });
    }

    _backpress(){
        this.props.navigator.pop();
    }
    _updateRegister(){
        firebase.database.ref().push({Name: this.state.name , Email: this.state.email, Password: this.state.password, Phone: this.state.phone, Gender: this.state.gender })        
    }

    async signup() {

        try {
            await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);
            
            var key = firebase.auth().currentUser.uid;
            await firebase.database().ref("Register/"+ key ).set({
                Name: this.state.name , 
                Email: this.state.email, 
                Phone: this.state.phone, 
                Gender: this.state.gender
            })
            
            Alert.alert(
                '저장완료',
                '계정이 생성 완료 됐습니다.',
                [
                    {text: '확인', onPress: () => this.props.navigator.pop()}
                ]
            )
        } catch (error) {
           alert(error);
        }

    }

   render() {
              
        return (
            <Container theme={myTheme}>
                <Content>
                    <List>
                        <ListItem>
                            <InputGroup>
                            <Icon name="ios-person" style={{ color: '#0A69FE' }} />
                                <Input inlineLabel label="성명" placeholder="이름을 입력해주세요" onChangeText={(text) => this.setState({name: text})} />
                            </InputGroup>
                        </ListItem>
                    
                        <ListItem>
                            <InputGroup>
                                <Icon name="ios-person" style={{ color: '#0A69FE' }} />
                                <Input placeholder="EMAIL"  onChangeText={(text) => this.setState({email: text})} />
                            </InputGroup>
                        </ListItem>
                        <ListItem>
                            <InputGroup>
                                <Icon name="ios-unlock" style={{ color: '#0A69FE' }} />
                                <Input placeholder="PASSWORD" secureTextEntry  onChangeText={(text) => this.setState({password: text})} />
                            </InputGroup>
                        </ListItem>
                        <ListItem>
                            <InputGroup>
                                <Icon name="ios-call" style={{ color: '#0A69FE' }} />
                                <Input placeholder="PHONE" keyboardType="numeric"  onChangeText={(text) => this.setState({phone: text})} />
                            </InputGroup>
                        </ListItem>

                        <ListItem iconLeft>
                            <Icon name="ios-transgender" style={{ color: '#0A69FE' }} />
                            <Text>GENDER</Text>
                            <Picker
                              iosHeader="Select one"
                              mode="dropdown"
                              selectedValue={this.state.selected1}
                              onValueChange={this.onValueChange.bind(this)} >
                                <Item label="남" value="01" />
                                <Item label="여" value="02" />
                            </Picker>
                        </ListItem>
                    
                        <ListItem>
                            <InputGroup >
                                <Input stackedLabel label="Permanent Address" placeholder="Address" />
                            </InputGroup>
                        </ListItem>
                    </List>
                    <Button style={{ alignSelf: 'center'}} onPress={this.signup.bind(this)}>
                        Sign Up
                    </Button>
                    <Button style={{ alignSelf: 'center'}} onPress={this._backpress.bind(this)}>
                        Cancel
                    </Button>
                </Content>
            </Container>
        );
    }
}