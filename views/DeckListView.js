import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableNativeFeedback, Platform, Button } from 'react-native';
import Page from './Page'
import API from '../dal/api.js'

class DeckList extends React.Component {
  render() {
    return (
      <View style={styles.content}>
        <FlatList
          data={(this.props.decks||[])}
          renderItem={item => <DeckListItem deck={item} loadDecks={this.props.loadDecks} navigation={this.props.navigation}/> } />
      </View>
    )
  }
}

class DeckListItem extends React.Component {

  render() {
    const deck = this.props.deck.item
    const loadDecks = this.props.loadDecks
    return (
      <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('DeckView', { id: deck.id, reload: loadDecks })}
        background={Platform.OS==='android' ? TouchableNativeFeedback.SelectableBackground() : ''}>
        <View style={styles.deck}>
          <Text style={styles.h2}>{deck.title}</Text>
          <Text style={{textAlign: 'right', marginRight: 5}}>{deck.questions.length} cards</Text>
        </View>
      </TouchableNativeFeedback>
    )}
}

startingState = {
  decks: [],
  loading: false
}

export default class DeckListView extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return (params.addDeck) ?
      {
        headerRight: (
          <View style={{paddingRight: 10}}>
            <Button
              onPress={params.addDeck}
              title="Add"
              color="#151"
            />
          </View>
        )
      }
      : null
  };

  state = startingState

  constructor(props) {
    super(props)
    this.getReloadList = async () => await this.loadDecks();
    this.addDeck = () => this.props.navigation.navigate('AddDeck', { reload: this.getReloadList })
  }

  async loadDecks() {
    API.getDecks().then(decks => {
      const deckData = (decks.map(deck => ({key:deck.id, ...deck})))
      this.setState({ decks: deckData});
    }).catch(err => {
      console.log(err)
    })
  }

  componentWillMount() {
    API.clearDecks()
    this.props.navigation.setParams({ addDeck: this.addDeck });
  }

  componentDidMount () {
    this.loadDecks()
  }

  componentDidUpdate () {
    const reload = this.props.navigation.getParam('reload')
    if (reload) {
      this.props.navigation.setParams({reload: false})
      this.loadDecks()
    }
  }

  render() {
    return (this.state.decks &&
      <Page>
        <DeckList decks={this.state.decks} loadDecks={this.getReloadList} navigation={this.props.navigation} />
      </Page>
    ) || null
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    marginHorizontal: 10,
    paddingTop: 5
  },
  deck: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    borderColor: '#ddd',
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 5,
    marginVertical: 5,
    backgroundColor: '#f0f0f0'
  },
  h2: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center'
  },
});
