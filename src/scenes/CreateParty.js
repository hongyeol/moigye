import React, { Component } from 'react';
import { View , TextInput, StyleSheet,Dimensions} from 'react-native';
import { Container, Content, Header, Title, Button, Icon,Text, List,ListItem,InputGroup,Input,Picker,Item,Left,Body,Right,Form,Label} from 'native-base';
import myTheme from '../themes/light';

import * as firebase from 'firebase';
var {height, width} = Dimensions.get('window');
export default class CreateParty extends Component {
    constructor(props){
        super(props);

        this.state ={
            PartyName: '',
            PartyType: '',
            PartyComment: '',
            BankPerson: '',
            BankNm: '',
            BankAccout: '',
            RegularPay: 0,
            ResidualPay: 0,
            disable: false
        }; 

        this._returnPop.bind(this);
    }
    
    _returnPop(){
        this.props.navigator.pop();
    }

    async updateParty(){
        try {
            this.setState({disable: true})
            var uid = await firebase.auth().currentUser.uid;
            var UserName = "";
            await firebase.database().ref().child('Register/'+ uid).on('value', (snap) => {
                UserName = snap.val().Name;
            });
            
            
                var newPostKey = await firebase.database().ref().child('Party').push().key;          
                
                await firebase.database().ref("Party/"+ newPostKey ).set({
                    PartyName: this.state.PartyName , 
                    PartyType: this.state.PartyType, 
                    PartyComment: this.state.PartyComment, 
                    BankPerson: this.state.BankPerson, 
                    BankNm: this.state.BankNm,
                    RegularPay: this.state.RegularPay,
                    ResidualPay: this.state.ResidualPay
                });

                
                var updates = {};
                
                updates['/Party/' + newPostKey + '/member/' + uid] = UserName;
                //updates['/Party/'+ newPostKey] = this.state.PartyName;
                updates['/Register/' + uid + '/party/' + newPostKey] = this.state.PartyName;
                //updates['/Party/' + this.state.PartyName + '/' + newPostKey] = this.state.PartyName;

                await firebase.database().ref().update(updates);

                this._returnPop();                
         

        }catch(error){
            alert(error);
        }  
    }



    render() {
        return (
            <Container>             
                <Header style={{backgroundColor:'#FF1212' }}>
                    <Left>
                    <Button transparent onPress={this._returnPop.bind(this)}>
                        <Icon name='ios-arrow-back' />
                    </Button>                
                    </Left>
                    <Body>
                    <Title>모임 생성</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>                         
                        <ListItem itemDivider>
                            <Text>모임 기본 정보</Text>
                        </ListItem>         
                            <Form style={{width: width}}>
                            <Item>                            
                                <Input placeholder="이름을 입력해주세요" onChangeText={(text) => this.setState({PartyName: text})} />
                            </Item>                                                                  
                            <Item >
                                <Input placeholder="모임소개" onChangeText={(text) => this.setState({PartyComment: text})}/>
                            </Item>
                            </Form>
                        <ListItem itemDivider>
                            <Text>모임 계좌 정보</Text>
                        </ListItem>

                            <Form style={{width: width}}>
                            <Item >
                                <Input placeholder="이름" onChangeText={(text) => this.setState({BankPerson: text})} />
                            </Item>                                                
                            <Item >                           
                                <Input placeholder="계좌번호" onChangeText={(text) => this.setState({BankNm: text})} />
                            </Item>                                                
                            <Item >                                
                                <Input placeholder="0" onChangeText={(text) => this.setState({RegularPay: text})} />
                            </Item>                                                
                            <Item >                              
                                <Input placeholder="0" onChangeText={(text) => this.setState({ResidualPay: text})} />
                            </Item>
                            </Form>                
                    <Button danger full disabled={this.state.disable} onPress={this.updateParty.bind(this)}><Text>모임생성 완료</Text></Button>
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