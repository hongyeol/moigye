import React, { Component } from 'react';
import { View,BackAndroid,Text} from 'react-native';
import { Container, Content, Header, Button, Icon,Title,List,ListItem,Left, Body,Right} from 'native-base';

import * as firebase from 'firebase';

import myTheme from '../themes/light';

export default class Member extends Component{
    
    constructor(props) {
        super(props);
        
        this.state = {
            item: []
        };
        
    }

    async listenForItems() {
        var itemsRef = await firebase.database().ref().child('Party/'+ this.props.route.index +'/member');

        var items = [];
        await itemsRef.on('value', (snap) => {

            snap.forEach((child) =>{
                items.push({
                    name: child.val(),
                    _key: child.key
                });
            });
            
            this.setState({
                item: items
            });

        });
    }

    _returnPop(){
        this.props.navigator.pop();
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
                    <Title>멤 버</Title>
                    </Body>
                    <Right />
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