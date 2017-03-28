import React, { Component } from 'react';
import { View,BackAndroid,Text , StyleSheet} from 'react-native';
import { Container, Content, Header, Button, Icon,Title,List,ListItem,Grid,Left,Right,Body,Thumbnail} from 'native-base';

import * as firebase from 'firebase';

import myTheme from '../themes/light';

var values;
export default class account_state extends Component{
    
    constructor(props) {
        super(props);

    this.state={
        name: [],
        price: 0
    };

        
        //item
        //alert(item2.length);
        /*item2 = list[2].list;
        alert(item2.name);*/
    
/*
    itemsList.forEach((child) =>{

        if(child._key === 'member'){
            child.name.forEach((child2) =>{
                alert(child2.name);
            })
            
        }

    })*/
    values =  this.props.route.value.list;
        

    }

    listenForItems() {
        var length;
        var price;
        values.forEach((data) => {
            if(data._key === 'member'){
                length = data.name.length ;                  
                this.setState({name: data.name});

            }else if(data._key === 'price'){
                price = data.name;            
            }

            this.setState({price: price / length});
        });
        
        /*
        var itemsList = this.props.route.value.list;

        var items = [];
        
        itemsList.forEach((child) =>{
            alert(child.name);
            if(child.length > 1){
                alert(child.name);
            }
            
            if(child._key === 'member'){
                
                var member = [];
                member = child.name;
                //alert(member.length);

                }
                
                /*
                child.forEach((child2) =>{
                    alert(child2.val());
                    items.push({
                        name: child2.val(),
                        _key: child2._key
                    });
                })              
            
        });
            
        
        this.setState({
            item: items
        });*/

    }

    _returnPop(){
        this.props.route.navigator.pop();
    }

    componentDidMount(){
        this.listenForItems();
    }
    
   render() {
              
        return (
            <Container theme={myTheme}>
                <Header style={{backgroundColor:'#FF1212' }}>
                    <Left>
                    <Button transparent onPress={this._returnPop.bind(this)}>
                        <Icon name='ios-arrow-back' />
                    </Button>                    
                    </Left>
                    <Body>
                    <Title>정산현황</Title>
                    </Body>
                    <Right />
                </Header>            
                <Content>
                    
                    <List dataArray={this.state.name} renderRow={(data) =>                                                
                        <ListItem key={data._key}>  
                            <Left >
                                <Thumbnail square size={80} source={require('../images/groupIcon.jpg')} />
                            </Left>  
                            <Body >  
                            <Text>{data.name}</Text>
                            </Body>
                            <Right >
                            <Text>{this.state.price}</Text>                            
                            </Right>                            
                        </ListItem>                        
                        
                    }
                    />                     
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
  container: {    
    flex: 1,
    backgroundColor: '#D5D5D5'
  },
    button: {
    backgroundColor:'#FFFFFF' ,
    width:360,
    height:50,
    
  },
})