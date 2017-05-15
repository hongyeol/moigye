import React, { Component } from 'react';
import { Navigator ,Text, BackAndroid} from 'react-native';
import { Drawer,  Container} from 'native-base';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';

import Login from './login';
import Index from './index';
import Detail from './detail';
import Register from './Register';
import Notice from './notice';
import CreateParty from './CreateParty';
import Introduce from './Introduce';
import LodingPage from './LodingPage';
import DetailWrite from './detail_write';
import Member from './Member';
import Account_detail from './account_detail';
import Account_detail_img from './account_detail_img';
import Account_state from './account_state';

import myTheme from '../themes/light';

import * as firebase from 'firebase';

import SideBar from './sidebar';
const firebaseConfig = {
  apiKey: "AIzaSyBowRFaxlpbjtalfevCE_EUMkthHZtHsC4",
  authDomain: "moigye-f893e.firebaseapp.com",
  databaseURL: "https://moigye-f893e.firebaseio.com",
  storageBucket: "moigye-f893e.appspot.com",
};



firebase.initializeApp(firebaseConfig).database().ref();

var ROUTES = {
  login: Login,
  index: Index,
  detail: Detail,
  register: Register,
  notice: Notice,
  createparty: CreateParty,
  introduce: Introduce,
  lodingpage: LodingPage,
  detailwrite: DetailWrite,
  member: Member,
  account_detail: Account_detail,
  account_detail_img: Account_detail_img,
  account_state: Account_state
};


export default class Main extends Component{
  
  constructor() {
      super();
      this.otherMethods = this.otherMethods.bind(this);
      this.updateParty = this.updateParty.bind(this);
  }

  static propTypes = {
    UserName: React.PropTypes.string
  }

    async updateParty(token){
      try {          
          var uid = await firebase.auth().currentUser.uid;
          var UserName = "";/*
          await firebase.database().ref().child('Register/'+ uid).on('value', (snap) => {
              UserName = snap.val().Name;
          });
          */

          var updates;              
          updates['/Register/' + uid + '/Token'] = UserName;
                
          await firebase.database().ref().update(updates);

      }catch(error){
          alert(error);
      }  
  }




    componentDidMount() {
        FCM.getFCMToken().then(token => {
            //alert("first token" + token);
            //this.updateParty(token);
            
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
            alert(token)
            
            // fcm token may not be available on first load, catch it here
        });
    }

    componentWillUnmount() {
        // stop listening for events
        this.notificationListener.remove();
        this.refreshTokenListener.remove();
    }

    otherMethods(){

        FCM.subscribeToTopic('/topics/moigye');
        FCM.unsubscribeFromTopic('/topics/foo-bar');
        
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

        FCM.setBadgeNumber(99);                                       // iOS only and there's no way to set it in Android, yet.
        FCM.getBadgeNumber().then(number=>console.log(number));     // iOS only and there's no way to get it in Android, yet.
        FCM.send('866522507212', {
          my_custom_data_1: 'my_custom_field_value_1',
          my_custom_data_2: 'my_custom_field_value_2'
        });
    }


    render() {
    return (
      <Navigator        
        initialRoute={{name: 'lodingpage', index: 0}}
        renderScene={this._renderScene}       
        configureScene={() => {return Navigator.SceneConfigs.PushFromRight;}}
        style={{flex: 1}}
      />
    )
  }

  _renderScene(route, navigator) {
    var Component = ROUTES[route.name];
    return <Component route={route} navigator={navigator} />;
  }
}