import React, { Component } from 'react';
import { View , TextInput, StyleSheet,Image ,BackAndroid,   Platform, Dimensions,TouchableHighlight } from 'react-native';
import { Container, Content, Tabs, Header, Title, Button, Icon,Fab, Drawer,Text,Left,Right,Body} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { SideMenu, List, ListItem } from 'react-native-elements';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';

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
            evennumber: false,
            displayName: firebase.auth().currentUser.displayName            
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
                             <TouchableHighlight onPress={() => this._detail(this.state.grouplist[number * 2])}><Image
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
            var list =[];
            list = this.props.navigator.getCurrentRoutes();
            if(!this.props.navigator.pop()){
                if(list.length == 1)
                    return false;                    
            }
            return true;
    });

        FCM.getFCMToken().then(token => {
            console.log(token)
            // store fcm token in your server
        });
        
        this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
            // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
            if(notif.local_notification){
                alert("local");
              //this is a local notification
            }
            if(notif.opened_from_tray){
                alert("open");
              //app is open/resumed because user clicked banner
            }
            //await someAsyncCall();

            if(Platform.OS ==='ios'){
              //optional
              //iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see the above documentation link. 
              //This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
              //notif._notificationType is available for iOS platfrom
              switch(notif._notificationType){
                case NotificationType.Remote:
                  notif.finish(RemoteNotificationResult.NewData) //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
                  break;
                case NotificationType.NotificationResponse:
                  notif.finish();
                  break;
                case NotificationType.WillPresent:
                  notif.finish(WillPresentNotificationResult.All) //other types available: WillPresentNotificationResult.None
                  break;
              }
            }
        });
        this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, (token) => {
            console.log(token)
            
            // fcm token may not be available on first load, catch it here
        });
    
  }
      otherMethods(){

        FCM.subscribeToTopic('/topics/moigye');
        
        FCM.getInitialNotification().then(notif=>console.log(notif));
        FCM.presentLocalNotification({
            id: "UNIQ_ID_STRING",                               // (optional for instant notification)
            title: "My Notification Title",                     // as FCM payload
            body: "My Notification Message",                    // as FCM payload (required)
            sound: "default",                                   // as FCM payload
            priority: "high",                                   // as FCM payload
            click_action: "ACTION",                             // as FCM payload
            badge: 10,                                          // as FCM payload IOS only, set 0 to clear badges
            number: 10,                                         // Android only
            ticker: "My Notification Ticker",                   // Android only
            auto_cancel: true,                                  // Android only (default true)
            large_icon: "ic_launcher",                           // Android only
            icon: "ic_launcher",                                // as FCM payload, you can relace this with custom icon you put in mipmap
            big_text: "Show when notification is expanded",     // Android only
            sub_text: "This is a subText",                      // Android only
            color: "red",                                       // Android only
            vibrate: 300,                                       // Android only default: 300, no vibration if you pass null
            tag: 'some_tag',                                    // Android only
            group: "group",                                     // Android only
            my_custom_data:'my_custom_field_value',             // extra data you want to throw
            lights: false,                                       // Android only, LED blinking (default false)
            show_in_foreground: true                                  // notification when app is in foreground (local & remote)
        });

        FCM.scheduleLocalNotification({
            fire_date: new Date().getTime(),      //RN's converter is used, accept epoch time and whatever that converter supports
            id: "UNIQ_ID_STRING",    //REQUIRED! this is what you use to lookup and delete notification. In android notification with same ID will override each other
            body: "from future past",
            repeat_interval: "week" //day, hour
        })

        FCM.getScheduledLocalNotifications().then(notif=>console.log(notif));

        //these clears notification from notification center/tray
        FCM.removeAllDeliveredNotifications()
        FCM.removeDeliveredNotification("UNIQ_ID_STRING")

        //these removes future local notifications
        FCM.cancelAllLocalNotifications()
        FCM.cancelLocalNotification("UNIQ_ID_STRING")

        FCM.setBadgeNumber(1);                                       // iOS only and there's no way to set it in Android, yet.
        FCM.getBadgeNumber().then(number=>console.log(number));     // iOS only and there's no way to get it in Android, yet.
        FCM.send('866522507212', {
          my_custom_data_1: 'my_custom_field_value_1',
          my_custom_data_2: 'my_custom_field_value_2'
        });
    }


     closeDrawer = () => {
        this._drawer._root.close();
      };
      openDrawer = () => {
        this._drawer._root.open()
        }

    render() {
       
          return (                      
         <Drawer                
                ref={(ref) => { this._drawer = ref }}
                content={<SideBar navigator={this.props.navigator} name={this.state.displayName} />}
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
            <Container>    
                                                   
                <Header style={{backgroundColor:'#FF1212' }}>
                    <Left>                  
                        <Button transparent onPress={this.openDrawer}>                        
                            <Icon name='md-menu' />
                        </Button>                    
                    </Left>
                    <Body>
                        <Title>모이계</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={this._notice.bind(this)}>
                            <Icon name='md-notifications' />
                        </Button>                    
                    </Right>

                </Header>
                <Content >  
                    
                    <Grid style={{backgroundColor: '#F2F2F2'}}>
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



