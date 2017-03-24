import React, { Component } from 'react';
import { View,BackAndroid,Text} from 'react-native';
import { Container, Content, Header, Button, Icon,Title,List,ListItem} from 'native-base';

import * as firebase from 'firebase';

import myTheme from '../themes/light';

export default class account_state extends Component{
    
    constructor(props) {
        super(props);
        
     var values =  this.props.route.value.list;
    
    this.state={
        imageName: []
    };
    
    var item = [];
    item.push({
        name: [1,2,3],
        _key: '123'
    })
    var list = [1,2,item];
    values.forEach((data) => {
            if(data._key === 'member'){
                //list = data.name;                
            //this.state.imageName = data.name;
            }
        });
        var item2 = [];
        item2 = list[2];
        //item
        alert(item2.length);
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


    }

    async listenForItems() {/*
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
                <Header>
                    <Button transparent onPress={this._returnPop.bind(this)}>
                        <Icon name='ios-arrow-back' />
                    </Button>                    
                    <Title>정산현황</Title>
                </Header>            
                <Content>
                    <List dataArray={this.state.item} renderRow={(data) =>
                        <ListItem key={data._key}>
                            <Text>{data.name}</Text>
                        </ListItem>                        
                    }
                    />                        
                </Content>
            </Container>
        );
    }
}