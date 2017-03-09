import React,{Component} from 'react';
import {View ,ListView} from 'react-native';
import ViewPager from'react-native-viewpager';


export default class test extends Component {

    constructor(){
        super();

        const ds = new ViewPager.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithPages([
        'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'
        ])

        }
    }
    
    render(){
        return(
        <ViewPager
            dataSource={this.state.dataSource}
            animation = {(animatedValue, toValue, gestureState) => {
            // Use the horizontal velocity of the swipe gesture
            // to affect the length of the transition so the faster you swipe
            // the faster the pages will transition
            var velocity = Math.abs(gestureState.vx);
            var baseDuration = 300;
            var duration = (velocity > 1) ? 1/velocity * baseDuration : baseDuration;

            return Animated.timing(animatedValue,
            {
            toValue: toValue,
            duration: duration,
            easing: Easing.out(Easing.exp)
            });
        }}
        />
        )
    }
}