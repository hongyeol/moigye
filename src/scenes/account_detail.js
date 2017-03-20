import React, { Component } from 'react';
import { View , TextInput, StyleSheet,Text,Image} from 'react-native';
import { Container, Content,  Header, Title, Button, Icon} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import myTheme from '../themes/light';

import * as firebase from 'firebase';
const url = null;
export default class account_detail extends Component {
  constructor(props){
    super(props);        

    this.returnPop= this.returnPop.bind(this);

    alert(url);
  }

  returnPop(){
      this.props.route.navigator.pop();
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
                    <Image
                        style={{width: 110, height: 110}}
                        source={{uri: url}}                                    
                        />
                    <Grid>
                        <Row>
                            <Col size={1}><Text>제목</Text></Col>
                            <Col size={9}><Text>11월 정기모임</Text></Col>
                        </Row>
                        <Row>
                            <Col size={1}><Text>일시</Text></Col>
                            <Col size={9}><Text>2017년 3월 20일</Text></Col>
                        </Row>
                        <Row>
                            <Col size={1}><Text>1차</Text></Col>
                            <Col size={3}><Text>1차 이름</Text></Col>
                            <Col size={6}><Text>21,000원</Text></Col>
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