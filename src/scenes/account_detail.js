import React, { Component } from 'react';
import { View , TextInput, StyleSheet,Text,Image} from 'react-native';
import { Container, Content,  Header, Title, Button, Icon} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import myTheme from '../themes/light';

import * as firebase from 'firebase';

export default class account_detail extends Component {
  constructor(props){
    super(props);        

    this.returnPop= this.returnPop.bind(this);
    this.detail_img = this.detail_img.bind(this);
  }

  returnPop(){
      this.props.route.navigator.pop();
  }

  detail_img(){
      this.props.route.navigator.push({name: 'account_detail_img',navigator: this.props.route.navigator})
  }
 
    render() {
        return (
          <Container theme={myTheme}>   
             <Header>  
                 <Button transparent onPress={this.returnPop}>
                        <Icon name='ios-arrow-back' />
                    </Button>

                    <Title>세부내역</Title>
                </Header>
                <Content style={styles.container}>
                    <Grid style={5 , {backgroundColor: '#FFFFFF' , marginTop: 5}}>
                        
                        <Row style={{flex: 1 , height: 50, alignItems: 'center'}}>
                            <Col size={10}><Text>제목</Text></Col>
                            <Col size={90} style={{  justifyContent: 'center'}}><Text style={{fontSize: 25}}>11월 정기모임11</Text></Col>
                        </Row>
                        <Row style={{borderTopWidth: 2 ,borderTopColor: '#D5D5D5', height: 40,alignItems: 'center'}}>
                            <Col size={10}><Text>일시</Text></Col>
                            <Col size={90}><Text>2017년 3월 20일</Text></Col>
                        </Row>
                        <Button style={styles.button} onPress={this.detail_img}>
                        <Row>
                            <Col size={10}><Text>1차</Text></Col>
                            <Col size={30}><Text>1차 이름</Text></Col>
                            <Col size={60}><Text>21,000원</Text></Col>
                        </Row>
                        </Button>
                        <Button style={styles.button} onPress={this.detail_img}>
                        <Row>
                            <Col size={10}><Text>1차</Text></Col>
                            <Col size={30}><Text>1차 이름</Text></Col>
                            <Col size={60}><Text>21,000원</Text></Col>
                        </Row>
                        </Button>
                        <Row style={{borderBottomWidth: 1 ,borderBottomColor: '#D5D5D5', height: 80,alignItems: 'center'}}>
                            <Col size={40}><Text>총지출</Text></Col>
                            <Col size={60}><Text>42,000원</Text></Col>                            
                        </Row>
                        <Row style={{borderBottomWidth: 1 ,borderBottomColor: '#D5D5D5', height: 100,alignItems: 'center'}}>
                            <Col size={15}><Text>계좌정보</Text></Col>
                            <Col size={85}><Text>620-196217-251 외환</Text></Col>
                        </Row>
                        <Button style={styles.button}>
                        <Row>
                            <Col size={85}><Text>정산상태</Text></Col>
                            <Col size={15}><Text>완료</Text></Col>
                        </Row>
                        </Button>
                        <Button block>완료</Button>
                        
                    </Grid>
                </Content>
          </Container>
        );
    }
}
const styles = StyleSheet.create({
  container: {    
    flex: 1,
    backgroundColor: '#D5D5D5'
  },
  grid: {
      flex: 1,      
      height:50
  },
    button: {
    backgroundColor:'#FFFFFF' ,
    width:360,
    height:50,
    marginBottom: 1,

  },
})