import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Page from './Page'
import API from '../dal/api.js'

class DeckCover extends React.Component {
  render() {
    const {deck, navigation, reloadList, reloadDeck} = this.props
    return (deck && deck.id &&
      <View style={styles.cover}>
        <View style={styles.content}>
          <Text style={styles.h2}>{deck.title}</Text>
          <Text>{deck.questions.length} Cards</Text>
          <Button title='Add a Question Card' onPress={
            () => navigation.navigate('AddQuestion', { id: deck.id, reloadList: reloadList, reloadDeck: reloadDeck })} />
          <Button title='Start the Quizz' disabled={deck.questions.length===0}
                  onPress={() => navigation.navigate('QuizzView', { id: deck.id })} />
        </View>
      </View>
    ) || null
  }
}

export default class DeckView extends React.Component {
  state = { deck: {}, loadingDeck: undefined }

  constructor(props) {
    super(props)
    this.getReloadDeck = async (id) => await this.loadDeck(id);
  }

  async loadDeck(id) {
    this.setState({loadingDeck: id})

    API.getDeck(id).then(deck => {
      this.setState({ deck, loadingDeck: undefined });
    }).catch(err => {
      console.log(err)
    })
  }

  componentDidMount () {
    const id = this.props.navigation.getParam('id')
    const reloadList = this.props.navigation.getParam('reload', ()=>{})
    if (this.state.loadingDeck===undefined && this.state.deck.id !== id) {
      this.setState({reloadList: reloadList, reloadDeck: this.getReloadDeck})
      this.loadDeck(id)
    }
  }

  componentDidUpdate () {
    const id = this.props.navigation.getParam('id')
    if (this.state.loadingDeck===undefined && this.state.deck.id !== id) {
      this.loadDeck(id)
    }
  }

  render() {
    return (
      <Page>
        <DeckCover deck={this.state.deck} reloadList={this.state.reloadList}
                   reloadDeck={this.state.reloadDeck} navigation={this.props.navigation} />
      </Page>
    ) || null
  }
}

const styles = StyleSheet.create({
  cover: {
    height: 200,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  h2: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
});
