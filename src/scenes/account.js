import React, { Component } from 'react';
import { View,Text,StyleSheet } from 'react-native';
import { Container, Content, Tabs ,Card,CardItem,ListItem,Right,Button,List} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import * as firebase from 'firebase';


export default class account extends Component {
  constructor(props){
    super(props);
        
    this.state={
      grouplist: [],
      check: false
    };

    this._renderRow = this._renderRow.bind(this);
    this.account_detail = this.account_detail.bind(this);
    this.renderData = this.renderData.bind(this);
    
  }

  account_detail(values){
    this.props.navigator.push({name: 'account_detail', navigator: this.props.navigator, value: values});
  }


    async listenForItems() {
        var date = new Date().getFullYear() + "" + new Date().getMonth();
        var itemsRef = await firebase.database().ref().child('Party/'+ this.props.value +'/accounting');
        
       await itemsRef.on('value', (snap) => {
          
        // get children as an array            
            var year = [];
            var month = [];
            var day = [];
            var member = [];

            snap.forEach((child) => {  
              child.forEach((child2) => {
                var list = [];
                child2.forEach((child3) => {
                  var items = [];
                  child3.forEach((child4) => {
                    
                    if(child4.hasChildren()){                     
                      child4.forEach((child5) =>{   
                                      
                        member.push({
                          name: child5.val(),
                          _key: child5.key
                        });
                      });

                      items.push({
                        name: member,
                        _key: 'member'
                      });

                    }else{                    
                    items.push({                
                      name: child4.val(),
                      _key: child4.key
                    });
                    }
                    

                  });
                  list.push({                
                    _key: child3.key,
                    list: items
                  });
                  

                })
                day.push({
                  _key: child2.key,
                  list: list
                });
                
              });
              year.push({
                _key: child.key,
                list: day
              });
            });
            this.setState({
                grouplist: year
            })

        }); 
    }

    renderData(value){
      
      if(value._key !== "image" && value._key !== "member"){
        return(<Col size={30}>
          <Text>{value.name}</Text>
        </Col>)
      }else{
        return false;
      }
     
    }


    _renderRow(data,sectionid,rowid,highlightrow){
      return(
           <View>
             <ListItem itemDivider style={{flex: 1,justifyContent: 'center' ,alignItems: 'center'}}>
                  <Text >{data._key.substring(0,4)}년{data._key.substring(4,6)}월</Text>
            </ListItem>             
            <ListItem>
            <List dataArray={data.list} renderRow={(data2,sectionid2,rowid2,highlightrow) => 
              <View>                
                <ListItem>
                <List dataArray={data2.list} renderRow={(data3,sectionid,rowid3,highlightrow) => 
                    <ListItem>
                      
                      <Grid>
                        <Row>
                        <Col  size={10}>
                          <Text>{data2._key}</Text>
                        </Col>                        
                        <Col  size={90}>
                          <Row>
                        <Button style={styles.button} onPress={()=> this.account_detail(data3)}>
                        <List dataArray={data3.list} renderRow={(data4,sectionid,rowid4,highlightrow) =>                           
                            {return this.renderData(data4)}
                          } />            
                          </Button>   
                          </Row>
                        </Col>
                        </Row>
                        </Grid>
                        
                      </ListItem>
                } />
                </ListItem>
              </View>
            } />
            </ListItem> 
         </View>                                        
      )
    }

    componentDidMount(){
      this.listenForItems();
    }
     
    render() {
        return (
        <Container style={styles.container}>
        <Content >
            <List dataArray={this.state.grouplist} renderRow={this._renderRow}/>
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
    width:360,
    height:50,
    marginBottom: 1
  },

});