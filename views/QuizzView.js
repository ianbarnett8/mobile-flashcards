import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Page, { PageHeader} from './Page'
import API from '../dal/api.js'

class QuizzContainer extends React.Component {
  render() {
    const {title, index, total} = this.props
    return (title &&
      <View style={styles.content}>
        <View style={styles.heading}>
          <Text style={styles.h2}>{title}</Text>
        </View>
        <View style={styles.questionCount}>
          <Text>Question {index+1} of {total}</Text>
        </View>
        <View>
          {this.props.children}
        </View>
      </View>
    ) || null
  }
}

class QuizzQuestion extends React.Component {
  render() {
    const { question, flipper } = this.props

    return (
      <View style={styles.body}>
        <Text style={styles.qna}>Q. {question}</Text>
        <Button style={styles.buttons} title='Check the Answer..' onPress={()=> flipper()} />
      </View>
    ) || null
  }
}

class QuizzAnswer extends React.Component {
  render() {
    const { answer, flipper, correct } = this.props

    return (
      <View>
        <View>
          <Text style={styles.qna}>A. {answer}</Text>
          <Button style={styles.buttons} title='What was the Question?' onPress={()=> flipper()} />
        </View>
        <View style={styles.selfAssess}>
          <Button color={'#cc4444'} title='Incorrect' onPress={()=> correct(false)} />
          <Button color={'#448844'} title='Correct' onPress={()=> correct(true)} />
        </View>
      </View>
    )
  }
}

class QuizzResult extends React.Component {
  render() {
    const {title, correct, total, restart, goBack} = this.props
    return (title &&
      <View style={styles.content}>
        <View style={styles.heading}>
          <Text style={styles.h2}>{title}</Text>
        </View>
        <View>
          <Text style={styles.qna}>Answered {correct} of {total} questions correctly</Text>
        </View>
        <View style={styles.selfAssess}>
          <Button color={'#cc4444'} title='Restart Quizz' onPress={restart} />
          <Button color={'#448844'} style={{marginTop: 20}} title='Deck View' onPress={goBack} />
        </View>
      </View>
    ) || null
  }
}

export default class QuizzView extends React.Component {
  state = { deck: {}, index: 0, showAnswer: false, correct: 0 }

  constructor(props) {
    super(props)
    this.showQuestion = () => this.setState({showAnswer: false})
    this.showAnswer = () => this.setState({showAnswer: true})
    this.answered = correct => this.setState({showAnswer: false, index: this.state.index+1, correct: this.state.correct+(correct?1:0)})
    this.restart = () => this.setState({showAnswer: false, index: 0, correct: 0})
    this.goBack = () => {
      this.setState({showAnswer: false, index: 0, correct: 0})
      this.props.navigation.goBack()
    }
  }

  loadDeck(id) {
    API.getDeck(id).then(deck => {
      this.setState({ deck });
    }).catch(err => {
      console.log(err)
    })
  }

  componentDidMount () {
    const id = this.props.navigation.getParam('id')
    if (id) {
      this.loadDeck(id)
    }
  }

  render() {
    const {deck, index, showAnswer, correct} = this.state
    const {question, answer} = (deck.questions && index<deck.questions.length) ? deck.questions[index] : {}

    return (
      <Page>
        {(question !== undefined
          ? <QuizzContainer title={deck.title} index={index} total={(deck.questions||[]).length}>
            {(showAnswer
              ? <QuizzAnswer answer={answer||'---'} flipper={this.showQuestion} correct={this.answered}/>
              : <QuizzQuestion question={question||'---'} flipper={this.showAnswer}/>
            )}
          </QuizzContainer>
            : <QuizzResult title={deck.title} correct={correct} total={(deck.questions||[]).length}
                           restart={this.restart} goBack={this.goBack}/>
        )}
      </Page>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    marginHorizontal: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  questionCount: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  h2: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  qna: {
    color: 'black',
    fontSize: 30,
    marginVertical: 20,
    textAlign: 'center'
  },
  selfAssess: {
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
});
