import React, { Component } from 'react';
import { View , TextInput, StyleSheet} from 'react-native';
import { Container, Content, Header, Title, Button, Icon,Text, List,ListItem,InputGroup,Input,Picker,Item} from 'native-base';
import myTheme from '../themes/light';

import * as firebase from 'firebase';

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
            <Container theme={myTheme}>             
                <Header>
                    <Button transparent onPress={this._returnPop.bind(this)}>
                        <Icon name='ios-arrow-back' />
                    </Button>                
                    <Title>모임 생성</Title>
                </Header>
                <Content> 
                    <List>        
                        <ListItem itemDivider>
                            <Text>모임 기본 정보</Text>
                        </ListItem>         
                        <ListItem>
                            <InputGroup>                                
                                <Input inlineLabel label="모임명" placeholder="이름을 입력해주세요" onChangeText={(text) => this.setState({PartyName: text})} />
                            </InputGroup>
                        </ListItem>                    
                        <ListItem>
                            <InputGroup>
                                <Input inlineLabel label="모임소개"   onChangeText={(text) => this.setState({PartyComment: text})}/>
                            </InputGroup>
                        </ListItem>
                        <ListItem itemDivider>
                            <Text>모임 계좌 정보</Text>
                        </ListItem>
                        <ListItem>
                            <InputGroup>                                
                                <Input inlineLabel label="예금주" placeholder="이름" onChangeText={(text) => this.setState({BankPerson: text})} />
                            </InputGroup>
                        </ListItem>  
                        <ListItem>
                            <InputGroup>                                
                                <Input inlineLabel label="은행/계좌번호" placeholder="번호" onChangeText={(text) => this.setState({BankNm: text})} />
                            </InputGroup>
                        </ListItem>  
                        <ListItem>
                            <InputGroup>                                
                                <Input inlineLabel label="정기회비" placeholder="0" onChangeText={(text) => this.setState({RegularPay: text})} />
                            </InputGroup>
                        </ListItem>  
                        <ListItem>
                            <InputGroup>                                
                                <Input inlineLabel label="잔여회비" placeholder="0" onChangeText={(text) => this.setState({ResidualPay: text})} />
                            </InputGroup>
                        </ListItem>  
                    </List>                    
                    <Button block disabled={this.state.disable} style={styles.button} onPress={this.updateParty.bind(this)}>모임생성 완료</Button>
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