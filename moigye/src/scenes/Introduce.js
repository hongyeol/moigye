import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,Image,
  Dimensions
} from 'react-native';
import AppIntro from 'react-native-app-intro';
var {height, width} = Dimensions.get('window');

export default class Introduce extends Component {
  constructor(props){
    super(props);

    this.doneBtnHandle = this.doneBtnHandle.bind(this);
    this.onSkipBtnHandle = this.onSkipBtnHandle.bind(this);
  }

  doneBtnHandle(){
    
  this.props.navigator.push({
              name: "login"
          })
  }

  onSkipBtnHandle(){
  this.props.navigator.push({
              name: "login"
          })
  }


  render() {
    return (
      <AppIntro
        onDoneBtnClick={this.doneBtnHandle}
        onSkipBtnClick={this.onSkipBtnHandle}
      >
        <View style={[styles.slide,{ backgroundColor: '#fa931d' }]}>
          <Image
            style={{width: width, height: 500}}
            source={require('../images/main.png')}
            />
        </View>
        <View style={[styles.slide, { backgroundColor: '#a4b602' }]}>
          <View level={-10}><Text style={styles.text}>Page 2</Text></View>
          <View level={5}><Text style={styles.text}>Page 2</Text></View>
          <View level={20}><Text style={styles.text}>Page 2</Text></View>
        </View>
        <View style={[styles.slide,{ backgroundColor: '#fa931d' }]}>
          <View level={8}><Text style={styles.text}>Page 3</Text></View>
          <View level={0}><Text style={styles.text}>Page 3</Text></View>
          <View level={-10}><Text style={styles.text}>Page 3</Text></View>
        </View>
        <View style={[styles.slide, { backgroundColor: '#a4b602' }]}>
          <View level={5}><Text style={styles.text}>Page 4</Text></View>
          <View level={10}><Text style={styles.text}>Page 4</Text></View>
          <View level={15}><Text style={styles.text}>Page 4</Text></View>
        </View>
      </AppIntro>
    );
  }
}
const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});