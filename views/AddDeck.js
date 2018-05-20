import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import Page from './Page'
import API from '../dal/api.js'

export default class AddDeck extends React.Component {
  state = { title: '' }

  saveDeck(title, reloadList) {

    API.saveDeckTitle(title)
      .then(id => {
        reloadList()
        return this.props.navigation.replace('DeckView', { id: id, reload: reloadList });
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    const reloadList = this.props.navigation.getParam('reload', ()=>{})

    return (
      <Page>
        <View style={styles.form}>
          <Text style={styles.label}>Title for new deck?</Text>
          <TextInput
            style={styles.input} autoFocus={true}
            maxLength={30} onChangeText={(title) => this.setState({title})}
            value={this.state.title} autoCapitalize={'words'}/>
          <Button title='Create Deck' onPress={() => this.saveDeck(this.state.title, reloadList)} />
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
