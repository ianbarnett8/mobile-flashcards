import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import Page from './Page'
import API from '../dal/api.js'

export default class AddQuestion extends React.Component {
  state = { deckId: undefined, question: '', answer: '' }

  componentDidMount () {
    const id = this.props.navigation.getParam('id')
    const reloadList = this.props.navigation.getParam('reloadList', ()=>{})
    const reloadDeck = this.props.navigation.getParam('reloadDeck', ()=>{})

    if (id && id !== this.state.deckId) {
      this.props.navigation.setParams({id: undefined})
      this.setState({ deckId: id, reloadList: reloadList, reloadDeck: reloadDeck })
    }
  }

  componentDidUpdate () {
    const id = this.props.navigation.getParam('id')

    if (id && id !== this.state.deckId) {
      this.props.navigation.setParams({id: undefined})
      this.setState({ deckId: id })
    }
  }

  saveQuestion() {
    const { deckId, question, answer, reloadList, reloadDeck } = this.state

    API.addCardToDeck(deckId, { question, answer })
      .then(id => {
        reloadList()
        reloadDeck(id)
        return this.props.navigation.navigate('DeckView');
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <Page>
        <View style={styles.form}>
          <Text style={styles.label}>Enter the question...</Text>
          <TextInput
            style={styles.input}
            maxLength={30} onChangeText={question => this.setState({question})}
            value={this.state.question} autoFocus={true}/>
          <Text style={styles.label}>And the answer...</Text>
          <TextInput
            style={styles.input}
            maxLength={30} onChangeText={answer => this.setState({answer})}
            value={this.state.answer}/>

          <Button title='Create Question Card' onPress={() => this.saveQuestion()} />
        </View>
      </Page>
    )
  }
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingHorizontal: 10
  },
  label: {
    color: 'black',
    fontSize: 30,
    marginVertical: 20,
    textAlign: 'left'
  },
  input: {
    fontSize: 20,
    paddingHorizontal: 5,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 15
  },
  h2: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
});
