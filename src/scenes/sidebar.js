import React, { Component } from 'react';
import { View , TextInput, StyleSheet,Text} from 'react-native';
import { Container, Content, Tabs, Header, Title, Button, Icon,Fab} from 'native-base';

import myTheme from '../themes/light';

import Drawer from 'react-native-drawer';


export default class sidebar extends Component {
  
    render() {
        return (
          <Container theme={myTheme}>   
             <Header>                                    
                    <Title>admin1님</Title>
                </Header>
                <Content style={styles.container}>
                  <Text>hi</Text>
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