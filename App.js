import React from 'react';
import { StyleSheet, Text, View, FlatList, ListItem, StatusBar } from 'react-native';
import testdata from './test.json';
import MovieList from './MovieList.js';
import { Expo, Font, AppLoading } from 'expo'
import { Container, Header, Content, Title, Left } from 'native-base'

const Roboto_font = require('native-base/Fonts/Roboto.ttf');
const Roboto_medium_font = require('native-base/Fonts/Roboto_medium.ttf');

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      movies: testdata.results,
    }
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });

    this.setState({ ready: true });
  }

  render() {
    if (!this.state.ready) {
      return <AppLoading />;
    }

    return (
      <Container>
        <Header>
          <Left>
            <Title>flixie-native</Title>
          </Left>
        </Header>
        <StatusBar hidden />
        <MovieList movies={this.state.movies} />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
