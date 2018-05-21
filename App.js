import React from 'react';
import DeckListView from './views/DeckListView'
import DeckView from './views/DeckView'
import QuizzView from './views/QuizzView'
import AddDeck from './views/AddDeck'
import AddQuestion from './views/AddQuestion'
import { createStackNavigator } from 'react-navigation';
import API from './dal/api.js'
import { setLocalNotification } from './util/notifications'
import { YellowBox } from 'react-native'

const RootStack = createStackNavigator(
  {
    Home: {
      screen: DeckListView,
      navigationOptions: ({ navigation }) => ({
        title: 'Mobile Flash Cards',
      })},
    DeckView: {
      screen: DeckView,
      navigationOptions: ({ navigation }) => ({
        title: 'Deck',
      })},
    QuizzView: {
      screen: QuizzView,
      navigationOptions: ({ navigation }) => ({
        title: 'Quizz',
      })},
    AddDeck: {
      screen: AddDeck,
      navigationOptions: ({ navigation }) => ({
        title: 'New Deck',
      })},
    AddQuestion: {
      screen: AddQuestion,
      navigationOptions: ({ navigation }) => ({
        title: 'New Question Card',
    })},
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#448844',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

export default class App extends React.Component {

  componentDidMount () {
    YellowBox.ignoreWarnings(['Warning: ...']);
    //API.clearDecks()
    setLocalNotification()
  }

  render() {
    return <RootStack />;
  }
}
