import React, { Component } from 'react';
import { View , TextInput, StyleSheet, Alert,ListView,Platform} from 'react-native';
import { Container, Content, Tabs, Tab,Header, Title, Button, Icon,Fab, Drawer,Left,Body,Right} from 'native-base';
import ImagePicker from 'react-native-image-picker';
import myTheme from '../themes/light';

import Account from './account';
import Ledger from './ledger';
import Schedule from './schedule';

import sidebar from './sidebar';
import * as firebase from 'firebase';

import RNFetchBlob from 'react-native-fetch-blob';
const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

export default class detail extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            active: false,
            icon: 'md-add',
            imageUrl: '',
            dataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      avatarSource: null,
        videoSource: null
        };

        this._iconSet = this._iconSet.bind(this);
        this._returnPop = this._returnPop.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.detail_write = this.detail_write.bind(this);
        this.member = this.member.bind(this);

        
    }

    _returnPop(){
        this.props.navigator.pop();
    }

    detail_write(values){
      this.props.navigator.push({name: 'detailwrite' ,index: this.props.route.index._key, value: values});
    }

    member(){
      this.props.navigator.push({name: 'member' ,index: this.props.route.index._key});
    }

    _iconSet(){
        if( this.state.active){
            this.setState({
                active: false,
                icon: 'md-add'
            })
        }else{
            this.setState({
                active: true,
                icon: 'md-close'
            })
        }
    }

    selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 200,
      takePhotoButtonTitle: '사진',
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        var source;

        // You can display the image using either:
        // source = { uri: 'data:image/jpeg;base64,' + response.data };

        // Or:
        if (Platform.OS === 'android') {
            
          source = { uri: response.uri };
        } else {
          source = { uri: response.uri.replace('file://', '') };
        }

        this.uploadImage(response.uri,response.fileName);
        //alert(source)
        this.setState({
          avatarSource: source
        });

        this.detail_write(response.fileName);
        
      }
    });
  }

  selectVideoTapped() {
    const options = {
      title: 'Video Picker',
      takePhotoButtonTitle: '비디오',
      mediaType: 'video',
      videoQuality: 'medium'
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled video picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {

        this.uploadImage(response.uri,"test");
        this.setState({
          videoSource: response.uri
        });
      }
    });
  }

uploadImage(uri, imageName, mime = 'image/jpg'){
  return new Promise((resolve, reject) => {
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
      let uploadBlob = null
      const imageRef = firebase.storage().ref('image').child(imageName)
      fs.readFile(uploadUri, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then((blob) => {
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        resolve(url)
      })
      .catch((error) => {
        reject(error)
      })
  })
}


    render() {
        return (
            <Container >             
                <Header  style={{backgroundColor:'#FF1212' }} >
                  <Left>
                    <Button transparent onPress={this._returnPop}>
                        <Icon name='ios-arrow-back' />
                    </Button>
                   </Left>
                   <Body> 
                    <Title>{this.props.route.index.name}</Title>
                    </Body>
                    <Right>
                    <Button transparent onPress={this.member}>
                        <Icon name='md-people' />
                    </Button>                    
                    <Button transparent>
                        <Icon name='md-settings' />
                    </Button>
                    </Right>
                </Header>                
                <Content>                
                    <Tabs>
                      <Tab heading='정산' tabStyle={{backgroundColor:'#FF1212' }} activeTabStyle={{backgroundColor:'#FF1212' }}  textStyle={{color:'#FFFFFF' }}>
                        <Account tabLabel='정산' value={this.props.route.index._key} navigator={this.props.navigator}/>
                      </Tab>
                      <Tab heading='장부' tabStyle={{backgroundColor:'#FF1212' }} activeTabStyle={{backgroundColor:'#FF1212' }} textStyle={{color:'#FFFFFF' }}>
                        <Ledger tabLabel='장부' />
                      </Tab>  
                      <Tab heading='일정' tabStyle={{backgroundColor:'#FF1212' }} activeTabStyle={{backgroundColor:'#FF1212' }} textStyle={{color:'#FFFFFF' }}>
                        <Schedule tabLabel='일정' />
                      </Tab>
                    </Tabs>
                </Content>
                <Fab
                        active={this.state.active}
                        direction="up"
                        containerStyle={{ marginLeft: 10 }}
                        style={{ backgroundColor: '#FF1212' }}
                        position="bottomRight"
                        onPress={this._iconSet}>
                        <Icon name={this.state.icon} />
                        <Button  onPress={this.selectPhotoTapped.bind(this)}>
                            <Icon name="md-camera"  />
                        </Button>
                        <Button  onPress={this.detail_write}>                            
                            <Icon name="md-create" />
                        </Button>
                        
                    </Fab>
                    
            </Container>
        );
        
    }
    
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    
  }
})