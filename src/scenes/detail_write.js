import React, {Component} from 'react';
import {View,Text,ListView} from 'react-native';
import { Container, Content,ListItem,CheckBox, List,Header,Button,Icon,Title} from 'native-base';
import * as firebase from 'firebase';

import myTheme from '../themes/light';

const ds = null;
export default class detail_write extends Component {
    constructor(props){
        super(props);
        
        this.state={
            dataSource: [],
            check: []               
        };
        
        this._returnPop = this._returnPop.bind(this);
        this.trancheck = this.trancheck.bind(this);
    }


    async data(){ 
        var itemsRef = await firebase.database().ref().child('Party/'+ this.props.route.index + '/member' )
        
        await itemsRef.on('value', (snap) => {

        // get children as an array
            var items = [];
            var check = [];
            var num=0;
            snap.forEach((child) => {
                items.push({                
                name: child.val(),
                _key: child.key
                
            });
            check[num] = true;
            num++;
        });
        
        
            this.setState({
                dataSource: items,
                check: check
            });

           
          
        });
    }

    async updateWrite(){
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
                })

                
                var updates = {};
                updates['/Party/' + newPostKey + '/member/' + uid] = UserName;
                updates['/Register/' + uid + '/party/' + newPostKey] = this.state.PartyName;
                //updates['/Party/' + this.state.PartyName + '/' + newPostKey] = this.state.PartyName;

                await firebase.database().ref().update(updates);

                this._returnPop();                
         

        }catch(error){
            alert(error);
        }  
    }

    _returnPop(){
        this.props.navigator.pop();

    }

    trancheck(value){
        
        this.state.check[value] = !this.state.check[value]

        this.setState({

          check: this.state.check  
        })
    }

    componentDidMount() {
        this.data();
    }

render(){

    return(
        <Container theme={myTheme}>
            <Header>
                    <Button transparent onPress={this._returnPop}>
                        <Icon name='ios-arrow-back' />
                    </Button>                    
                    <Title>인원설정</Title>
                </Header>
                <Content>
                    <List dataArray={this.state.dataSource} renderRow={(data,sectionid,rowid,highlightrow) =>                        
                        <ListItem  button={true} onPress={() => this.trancheck(rowid)}>
                            <CheckBox  checked={this.state.check[rowid]} onPress={() => this.trancheck(rowid)} />
                                    <Text>{data.name}</Text>
                        </ListItem>                       
                       
                    } />
                </Content>
            </Container>
    );
    }
}