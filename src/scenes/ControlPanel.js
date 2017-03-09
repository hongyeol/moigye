import React, { Component } from 'react';
import { Text,View , TextInput, StyleSheet,Image ,BackAndroid, PixelRatio,  Platform,} from 'react-native';
import { Drawer ,Button,Container,Content} from 'native-base';

import ImagePicker from 'react-native-image-picker';

import SideBar from './sidebar';

export default class ControlPanel extends Component {    


    closeDrawer = () => {
        this._drawer.close();
      };
      openDrawer = () => {
  this._drawer.open()
}

    render() {
       
          return ( 
            <Drawer
                ref={(ref) => { this._drawer = ref }}
                content={<SideBar navigator={this._navigator} />}
                onClose={() => this.closeDrawer.bind(this)}
                tapToClose={true}
            openDrawerOffset={0.2}
            panCloseMask={0.2}
            closedDrawerOffset={-3}
            styles={{
                drawer: {shadowColor: '#998A00', shadowOpacity: 0.8, shadowRadius: 3},
                main: {paddingLeft: 3}
            }}
            tweenHandler={(ratio) => ({
                main: { opacity:(2-ratio)/2 }
            })}
           
                
            >
            <Container>
              <Content>
               <Button onPress={this.openDrawer} ><Text>test</Text></Button>
               </Content>
            </Container>                       
          </Drawer>    
                                  
        );
        
    }
    
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  }
})



