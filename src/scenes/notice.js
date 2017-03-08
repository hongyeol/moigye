import React, { Component } from 'react';
import { View,BackAndroid} from 'react-native';
import { Container, Content, Header, Button, Icon,Title} from 'native-base';

import myTheme from '../themes/light';

export default class notice extends Component{
    
    constructor(props) {
        super(props);
        
        this.state = {
            selectedItem: undefined,
            selected1: 'key0',
            results: {
                items: [],
            },
        };        
    }

    onValueChange(value) {
        this.setState({
            selected1: value,
        });
    }

    _returnPop(){
        this.props.navigator.pop();
    }
    
   render() {
              
        return (
            <Container theme={myTheme}>
                <Header>
                    <Button transparent onPress={this._returnPop.bind(this)}>
                        <Icon name='ios-arrow-back' />
                    </Button>                    
                    <Title>알림</Title>
                </Header>            
                <Content>                        
                </Content>
            </Container>
        );
    }
}