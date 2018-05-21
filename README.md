To install react native app tools
> `npm install -g create-react-native-app`

To build
> `npm install`

To run
> `npm start`

Tested Platforms
> `Android Device` via Expo app

Testing
1. Uncomment `API.clearDecks()` in `App.js` to clear deck memory from AsyncStorage, otherwise new decks will be remembered after each reload
2. Notifications are queued up for the following day 5pm unless a Quizz is completed (then the notification is reset)
