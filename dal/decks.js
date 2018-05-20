export default function dummyData () {
  const padding = []
  //for (let i=0; i<8; ++i) {
  //  padding.push({ id: 'deck'+i, title: 'Deck'+i, questions: [] })
  //}

  return [
    {
      id: 'React',
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    {
      id: 'JavaScript',
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    },
    ...padding,
  ]
}
