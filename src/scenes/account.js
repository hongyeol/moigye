import React, { Component } from 'react';
import { View,Text,StyleSheet } from 'react-native';
import { Container, Content, Tabs ,Card,CardItem,ListItem,Right,Button} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import * as firebase from 'firebase';


export default class account extends Component {
  constructor(props){
    super(props);
        
    this.State={
      list: []
    }

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
           
        
            this.setState({
                grouplist: items,
                group: array,
                loading: true,
                evennumber: evennum
            })
        });
        
    }

     
    render() {
        return (
        <Container style={styles.container}>
        <Content >
          <ListItem itemDivider style={{flex: 1,justifyContent: 'center' ,alignItems: 'center'}}>
            <Text >2017년 2월</Text>
          </ListItem>
          <ListItem style={styles.masterRow}>
            <Grid style={5}>
              <Row style={styles.masterRow}>
              <Col  size={10}>
                <Text>30</Text>
              </Col>
              <Col  size={90}>
              <Button style={styles.button}>
                <Row>
                  <Col>
                    <Text>2월 정기정모</Text>
                  </Col>
                  <Col>
                    <Text>300000원</Text>
                  </Col>                              
                </Row>
                </Button>
                <Button style={styles.button}>
                <Row style={styles.border}>
                  <Col>
                    <Text>족발벙</Text>
                  </Col>
                  <Col>
                    <Text>300000원</Text>
                  </Col>                              
                </Row>
                </Button>
                <Button style={styles.button}>
                <Row style={styles.border}>
                  <Col>
                    <Text>영화벙</Text>
                  </Col>
                  <Col>
                    <Text>300000원</Text>
                  </Col>                              
                </Row>
                </Button>
              </Col>
              </Row>
              </Grid>
             </ListItem>
             <ListItem itemDivider>
            <Text>2017년 2월</Text>
          </ListItem> 
          <ListItem>
            <Grid>
              <Row style={styles.border}>
              <Col style={styles.border} size={10}>
                <Text>30</Text>
              </Col>
              <Col style={styles.border} size={90}>
              <Button style={{backgroundColor:'#EAEAEA' ,width:305}}>
                <Row style={styles.border}>
                  <Col>
                    <Text>2월 정기정모</Text>
                  </Col>
                  <Col>
                    <Text>300000원</Text>
                  </Col>                              
                </Row>
                </Button>
              </Col>
              </Row>      
              <Row style={styles.border}>
              <Col style={styles.border} size={1}>
                <Text>30</Text>
              </Col>
              <Col style={styles.border} size={5}>
                <Row style={styles.border}>
                  <Col>
                    <Text>2월 정기정모</Text>
                  </Col>
                  <Col>
                    <Text>300000원</Text>
                  </Col>                              
                </Row>
                <Row style={styles.border}>
                  <Text>456</Text>
                </Row>
              </Col>
              </Row>      
            </Grid>
        </ListItem>            
        </Content>
      </Container>
        );
    }
}



const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FBFAFA',
  },  
  grid: {
    flex: 1,
    borderRightColor: '#000000',
    borderRightWidth: 1
  },
  button: {
    backgroundColor:'#EAEAEA' ,
    width:305,
    marginBottom: 1
  },

});