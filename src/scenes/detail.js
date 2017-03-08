import React, { Component } from 'react';
import { View , TextInput, StyleSheet, Alert,ListView,Platform} from 'react-native';
import { Container, Content, Tabs, Header, Title, Button, Icon,Fab, Drawer} from 'native-base';
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
    constructor(){
        super();
        
        this.state = {
            active: false,
            icon: 'md-add',
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

        
    }

    _returnPop(){
        this.props.navigator.pop();
    }

    detail_write(){
      this.props.navigator.push({name: 'detailwrite' ,index: this.props.route.index});
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
        
        this.setState({
          avatarSource: source
        });

        this.detail_write();
        
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
            <Container theme={myTheme} >             
                <Header>
                    <Button transparent onPress={this._returnPop}>
                        <Icon name='ios-arrow-back' />
                    </Button>
                    
                    <Title>GROUP1</Title>
                    
                    <Button transparent>
                        <Icon name='md-people' />
                    </Button>                    
                    <Button transparent>
                        <Icon name='md-settings' />
                    </Button>
                </Header>
                <Content>                
                    <Tabs>
                        <Account tabLabel='정산' value={this.props.route.index} />
                        <Ledger tabLabel='장부' />
                        <Schedule tabLabel='일정' />
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
                        <Button style={{ backgroundColor: '#FFFFFF' }} onPress={this.detail_write}>
                            <Icon name="md-camera" style={{color: '#191919'}} />
                        </Button>
                        <Button style={{ backgroundColor: '#FFFFFF' }} onPress={this.detail_write}>                            
                            <Icon name="md-create" style={{color: '#191919'}}/>
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