/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry,Image } from 'react-native';
import * as firebase from 'firebase';
import Main from './src/scenes/main';


export default class moigye extends Component{
  render() {
    return(         
      <Image
            style={{width: 360, height: 570}}
            source={require('./src/images/main.png')}
      />  
    )
  }


}
AppRegistry.registerComponent('moigye', () => Main);