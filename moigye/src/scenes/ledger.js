import React, { Component } from 'react';
import { View, Text ,StyleSheet} from 'react-native';
import { Container, Content, Tabs,Card,CardItem } from 'native-base';

export default class ledger extends Component {
    render() {
        return (
        <Container style={styles.container}>
        <Content padder>
          <Card style={{ flex: 0 }}>
            <CardItem>
              <Text>
                NativeBase is a free and open source framework that enables
                developers to build high-quality mobile apps using React Native
                iOS and Android apps with a fusion of ES6.
              </Text>
            </CardItem>
          </Card>
          <Card style={{ flex: 0 }}>
            <CardItem>
              <Text>
                NativeBase builds a layer on top of React Native that provides
                you with basic set of components for mobile application development.
                This helps you to build world-class application experiences
                on native platforms.
              </Text>
            </CardItem>
          </Card>
          <Card style={{ flex: 0 }}>
            <CardItem>
              <Text>
                NativeBase gives you the potential of building applications
                that run on iOS and Android using a single codebase.
              </Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
        );
    }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FBFAFA',
  },
  mb10: {
    flex: 1,
    marginBottom: 10,
  },
});