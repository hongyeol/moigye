import React , { Component} from 'react';
import { View } from 'react-native';

import {Button, Icon,Fab} from 'native-base';


export default class myFab extends Component{
    constructor(){
        super();
        this.state={
            active: false,
            icon: 'md-add'
        }

        this._iconSet = this._iconSet.bind(this);
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

    render(){
        return(
            <Fab
                active={this.state.active}
                direction="up"
                containerStyle={{ marginLeft: 10 }}
                style={{ backgroundColor: '#FF1212' }}
                position="bottomRight"
                onPress={this._iconSet}>
                <Icon name={this.state.icon} />
                <Button style={{ backgroundColor: '#FFFFFF' }}>
                    <Icon name="md-camera" style={{color: '#191919'}} />
                </Button>
                <Button style={{ backgroundColor: '#FFFFFF' }}>                            
                    <Icon name="md-create" style={{color: '#191919'}}/>
                </Button>
            </Fab>
        )
    }
}