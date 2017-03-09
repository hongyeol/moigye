import React, { Component } from 'react';
import { View , TextInput, StyleSheet,Image ,BackAndroid,   Platform, Dimensions,TouchableHighlight } from 'react-native';
import { Container, Content, Tabs, Header, Title, Button, Icon,Fab, Drawer,Text} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { SideMenu, List, ListItem } from 'react-native-elements';


import myTheme from '../themes/light';

import Account from './account';
import Ledger from './ledger';
import Schedule from './schedule';

import * as firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob';

import SideBar from './sidebar';

import ViewPager from 'react-native-viewpager';

const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob


var {height, width} = Dimensions.get('window');

export default class index extends Component {    
    constructor(){
        super();
        this.state={
            active: false,
            icon: 'md-add',
            grouplist: [],
            group: [],
            loading: false,
            evennumber: false            
        }
        
        this._iconSet = this._iconSet.bind(this);
        this._detail = this._detail.bind(this);
        this._returnPop = this._returnPop.bind(this);

        this.listenForItems = this.listenForItems.bind(this);
        this.cols = this.cols.bind(this);
        this.doublecols = this.doublecols.bind(this);
        this.RowWrite = this.RowWrite.bind(this);

        this._createparty = this._createparty.bind(this);


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

    _detail(value){        
        this.props.navigator.push({name: 'detail' , index: value});
    }

    _notice(Name){
        this.props.navigator.push({name: 'notice', index: 2});
    }
    _createparty(){
        this.props.navigator.push({name: 'createparty'});
    }

    _returnPop(){
        this.props.navigator.pop();
    }

    async listenForItems() {

        var uid = await firebase.auth().currentUser.uid;
        var itemsRef = await firebase.database().ref().child('Register/'+uid+'/party')

        await itemsRef.on('value', (snap) => {

        // get children as an array
            var items = [];
            snap.forEach((child) => {                
                items.push({                
                name: child.val(),
                _key: child.key
                });
            });
            
           
            var evennum = false;
            var maxcount = 0;            
            if(items.length%2 !== 0){
                maxcount = Math.floor((items.length / 2)) + 1;
                evennum = false;
            }else{            
                if(items.length === 1){
                    maxcount = 1;
                    evennum = false;
                }else{                            
                    maxcount = (items.length / 2);
                    evennum = true;
                }
            }            
            var array = [];   
            for(var count=0; count < maxcount; count++){

                if(count === maxcount -1){
                    if (evennum === true){
                        array[count] = true;
                    }else{
                        array[count] = false;
                    }
                }else{
                    array[count] = true;
                }                                        
            }
        
            this.setState({
                grouplist: items,
                group: array,
                loading: true,
                evennumber: evennum
            })
        });
        
    }
    

  cols(number){
      if(this.state.loading === true){
        return(  
            <Row key={number}>       
                <Col style={{ borderStyle: 'solid', height:150 ,justifyContent: 'center', alignItems: 'center'}} key={this.state.grouplist[number * 2]._key} >
                             <TouchableHighlight onPress={this._detail}><Image
                        style={{width: 110, height: 110}}
                        source={require('../images/groupIcon.jpg')}                                    
                        /></TouchableHighlight>                                  
                            <Text>{this.state.grouplist[number * 2].name}</Text>                                    
                </Col>
            </Row>
        )
      }
  }

  doublecols(number){
      var addvalue;
      if (number === 0){
          addvalue = 1;
      }else{
          addvalue = 1;
      }
      if(this.state.loading === true){
        return(
            <Row key={number}>
                <Col style={{ borderStyle: 'solid', height:150 ,justifyContent: 'center', alignItems: 'center'}} key={this.state.grouplist[number * 2]._key} >
                            <TouchableHighlight onPress={() => this._detail(this.state.grouplist[number * 2])}  ><Image
                        style={{width: 110, height: 110}}
                        source={require('../images/groupIcon.jpg')}                                    
                        /></TouchableHighlight>                                 
                            <Text>{this.state.grouplist[number * 2].name}</Text>                                    
                </Col>
                <Col style={{ borderStyle: 'solid', height:150 ,justifyContent: 'center', alignItems: 'center'}} key={this.state.grouplist[(number*2) + 1]._key} >
                           <TouchableHighlight onPress={() => this._detail(this.state.grouplist[(number * 2) + 1])} ><Image
                        style={{width: 110, height: 110}}
                        source={require('../images/groupIcon.jpg')}                                    
                        /></TouchableHighlight>                                  
                            <Text>{this.state.grouplist[(number *2) + 1].name}</Text>
                </Col>
            </Row>
        )
      }
  }

  RowWrite(index){    
    if(this.state.loading === true){
        if(this.state.group[index] === true){
            return this.doublecols(index);
        }else{
            return this.cols(index);
        }
    }
  }



    componentDidMount() {        
        this.listenForItems(this.state.itemsRef);
        BackAndroid.addEventListener('hardwareBackPress', () => {

            if(!this.props.navigator.pop()){
                alert(this.props.route.name);
            }
            return true;
    });
  }


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
                content={<SideBar navigator={this._navigator} name={firebase.auth().currentUser.displayName} />}
                onClose={() => this.closeDrawer}
                type="overlay"
                tapToClose={true}
                panCloseMask={0.3}
                closedDrawerOffset={-3}
                openDrawerOffset={0.3}
                tweenHandler={(ratio) => ({
                    main: { opacity:(2-ratio)/2 }
                })}
                styles={{
                drawer: {shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3 },
                
                }}
            >
            <Container theme={myTheme}>                                        
                <Header>                  
                    <Button transparent onPress={this.openDrawer}>                        
                        <Icon name='md-menu' />
                    </Button>                    
                    <Title>모이계</Title>
                    <Button transparent onPress={this._notice.bind(this)}>
                        <Icon name='md-notifications' />
                    </Button>                    

                </Header>
                <Content style={{backgroundColor: '#F2F2F2'}}>  
                    
                    <Grid>
                        <Row style={{ backgroundColor: '#FAE0D4', height:200}}>
                            <Image
                                    style={{width: width, height: 200}}
                                    source={require('../images/event.jpg')}                                    
                                    />  
                        </Row>
                        
                        {this.state.group.map((value , index) => {
                            return this.RowWrite(index)
                        })}                    
                    </Grid>                                        
                </Content>
                 <Fab
                        active={this.state.active}
                        direction="up"
                        containerStyle={{ marginLeft: 10 }}
                        style={{ backgroundColor: '#FF1212' }}
                        position="bottomRight"
                        onPress={this._createparty}>
                        <Icon name={this.state.icon} />                                                
                    </Fab>
                    
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



