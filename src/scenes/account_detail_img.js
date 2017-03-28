import React, { Component } from 'react';
import { View , TextInput, StyleSheet,Text,Image, Dimensions} from 'react-native';
import { Container, Content,  Header, Title, Button, Icon,Left,Body,Right} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import myTheme from '../themes/light';
import * as firebase from 'firebase';
var {height, width} = Dimensions.get('window');

export default class account_detail_img extends Component {
  constructor(props){
    super(props);        

    this.returnPop= this.returnPop.bind(this);
    var values =  this.props.route.value.list;
    
    this.state={
        imageName: ''
    };
    
    values.forEach((data) => {
            if(data._key === 'image'){
            this.state.imageName = data.name;
            }
        });
  
    
  }

  returnPop(){
      this.props.route.navigator.pop();
  }
 
    render() {
        return (
          <Container theme={myTheme}>   
             <Header style={{backgroundColor:'#FF1212' }}>  
                 <Left>
                 <Button transparent onPress={this.returnPop}>
                        <Icon name='ios-arrow-back' />
                    </Button>
                    </Left>
                    <Body>
                    <Title>세부내역</Title>
                    </Body>
                    <Right />
                </Header>
                 <Content >
                     <View style={{flex: 1, position: 'absolute'}}>
                         <Image  source={{uri: 'https://firebasestorage.googleapis.com/v0/b/moigye-f893e.appspot.com/o/image%2F'+ this.state.imageName + '?alt=media'}} 
                                                   style={{width: width, height: 150}}/></View>
                    <Grid style={{backgroundColor: '#FFFFFF' , marginTop: 150}}>
                        <Row style={{borderTopWidth: 2 ,borderTopColor: '#D5D5D5', height: 40,alignItems: 'center'}}>
                            <Col size={10}><Text>이름</Text></Col>
                            <Col size={90}><Text>1차 이름</Text></Col>
                        </Row>
                        <Row style={{borderTopWidth: 2 ,borderTopColor: '#D5D5D5', height: 40,alignItems: 'center'}}>
                            <Col size={10}><Text>영수일시</Text></Col>
                            <Col size={90}><Text>2017년 03월 29일</Text></Col>
                        </Row>
                        <Row style={{borderBottomWidth: 1 ,borderBottomColor: '#D5D5D5', height: 80,alignItems: 'center'}}>
                            <Col size={40}><Text>영수금액</Text></Col>
                            <Col size={60}><Text>42,000원</Text></Col>                            
                        </Row>
                        <Row style={{borderBottomWidth: 1 ,borderBottomColor: '#D5D5D5', height: 100,alignItems: 'center'}}>
                            <Col size={15}><Text>참가자</Text></Col>
                            <Col size={85}><Text></Text></Col>
                        </Row>
  
                    </Grid>
                </Content>
          </Container>
        );
    }
}
const styles = StyleSheet.create({
  container: {    
    flex: 1
  }
})