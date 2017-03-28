import React, { Component } from 'react';
import { View , TextInput, StyleSheet,Text} from 'react-native';
import { Container, Content, Tabs, Header, Title, Button, Icon,Fab} from 'native-base';

import myTheme from '../themes/light';

import Drawer from 'react-native-drawer';
import * as firebase from 'firebase';

export default class sidebar extends Component {
  constructor(props){
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout(){
    firebase.auth().signOut();
    this.props.navigator.resetTo({name: "login"})    
  }
  
    render() {
        return (
          <Container>   
             <Header style={{backgroundColor:'#FF1212' }}>                                    
                    <Title>{this.props.name}</Title>
                </Header>
                <Content style={{backgroundColor:'#FFFFFF'}}>                  
                  <Button info block onPress={this.logout}><Text >로그아웃</Text></Button>
                </Content>
          </Container>
        );
    }
}
const styles = StyleSheet.create({
  container: {    
    flex: 1,
    backgroundColor: '#FFFFFF'
  }
})