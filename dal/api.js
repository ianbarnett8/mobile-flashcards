import { AsyncStorage } from 'react-native'
import dummyData from './decks.js'

const DECK_STORAGE_KEY = 'mobile-flashcards:decks'
const NOTIFICATION_STORAGE_KEY = 'mobile-flashcards:notifications'

const idFor = title => title.replace(/\s+/gi,'-').replace(/[^a-z0-9-]/ig,'')

const asMap = (acc,deck) => ({...acc, [deck.id]: {...deck} })
const asArray = decksMap => Object.keys(decksMap).map(deckId => decksMap[deckId])

const receiveDecks = async results => {
  const decksMap = (results !== null) ? JSON.parse(results) : dummyData().reduce(asMap,{})
  if (results === null) {
    await AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decksMap))
  }
  return asArray(decksMap)
}

const getDecks = async () => {
  return await AsyncStorage.getItem(DECK_STORAGE_KEY).then(receiveDecks)
}

const getDeck = async id => {
  return await AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then(receiveDecks)
    .then(decks => decks)
    .then(filter(id))
}

const filter = id => decks => decks.filter(deck => deck.id === id)[0]

const API = {
  clearNotifications: async () => {
    return await AsyncStorage.removeItem(NOTIFICATION_STORAGE_KEY).catch(err => { console.log(err) })
  },

  getNotification: async () => {
    return await AsyncStorage.getItem(NOTIFICATION_STORAGE_KEY).catch(err => { console.log(err) })
  },

  setNotification: async data => {
    return await AsyncStorage.setItem(NOTIFICATION_STORAGE_KEY, data).catch(err => { console.log(err) })
  },

  clearDecks: async () => {
    return await AsyncStorage.removeItem(DECK_STORAGE_KEY).catch(err => { console.log(err) })
  },

  getDecks: async () => {
    return await getDecks().catch(err => { console.log(err) })
  },

  getDeck: async deckId => {
    return await getDecks()
      .then(filter(deckId))
      .catch(err => { console.log(err) })
  },

  saveDeckTitle: async title => {
    const id = idFor(title)
    return await getDecks()
      .then(filter(id))
      .then(async deck => {
        if (deck === undefined) {
          const newDeck = {
            [id]: {
              id: id,
              title: title,
              questions: []
            }
          }
          await AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(newDeck))
          return id
        }
      })
      .catch(err => { console.log(err) })
  },

  addCardToDeck: async (deckId, card) => {
    if ((deckId || card || card.question || card.answer) === undefined) {
      return
    }

    const deck = await getDeck(deckId)
    if (deck !== undefined) {
      const updatedDeck = {
        [deckId]: {
          id: deck.id,
          title: deck.title,
          questions: deck.questions.concat(card)
        }
      }
      await AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(updatedDeck))
      return deckId
    }
  },
}

export default API