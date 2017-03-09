import React, { Component } from 'react';
import { View , TextInput, StyleSheet,Text} from 'react-native';
import { Container, Content, Tabs, Header, Title, Button, Icon,Fab} from 'native-base';

import myTheme from '../themes/light';

import Drawer from 'react-native-drawer';


export default class sidebar extends Component {
  constructor(props){
    super(props);
    
  }

  logout(){
    
  }
  
    render() {
        return (
          <Container theme={myTheme}>   
             <Header>                                    
                    <Title>{this.props.name}</Title>
                </Header>
                <Content style={styles.container}>
                  <Button onPress={this.logout.bind(this)}>로그아웃</Button>
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