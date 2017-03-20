import React, {Component} from 'react';
import {View,Text,ListView,StyleSheet} from 'react-native';
import { Container, Content,ListItem,CheckBox, List,Header,Button,Icon,Title} from 'native-base';
import * as firebase from 'firebase';

import myTheme from '../themes/light';

const ds = null;
export default class detail_write extends Component {
    constructor(props){
        super(props);
        
        this.state={
            dataSource: [],
            check: [],
            disble: false
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
            this.setState({disable: true});

            var year = new Date().getFullYear();
            var month = new Date().getMonth() + 1;
            var day = new Date().getDate();

            if(month.toString().length < 2){                
                month = "0" + month
            }

            var url = 'Party/'+ this.props.route.index + '/accounting/' + year   + month + '/' + day;
            var newPostKey = await firebase.database().ref().child(url).push().key;          

            await firebase.database().ref(url + "/" + newPostKey ).set({
                title: 'TEST영수증',
                price: 30000,
                image: this.props.route.value
            });

            
            var memberlist = {};
            this.state.dataSource.map((index, value) => {
                if(this.state.check[value]){
                    memberlist[url + "/" + newPostKey + "/member/" + this.state.dataSource[value]._key] = this.state.dataSource[value].name;
                }
                
            });
            await firebase.database().ref().update(memberlist);
            
            if(!alert("저장이 완료됐습니다")){
                this._returnPop();
            }          
        
            
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
                    <Button block disabled={this.state.disable} style={styles.button} onPress={this.updateWrite.bind(this)}>정산 완료</Button>
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