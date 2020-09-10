const initialState = {
  title: 'Give Us Some Feedback',
  subheading: 'Statistics',
  feedbackTypes: ['good', 'neutral', 'bad', 'zero'],
  feedback: { good: 0, neutral: 0, bad: 0 },
}

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GOOD':
      return {
        ...state,
        feedback: { ...state.feedback, good: state.feedback.good + 1 },
      }
    case 'NEUTRAL':
      return {
        ...state,
        feedback: { ...state.feedback, neutral: state.feedback.neutral + 1 },
      }
    case 'BAD':
      return {
        ...state,
        feedback: { ...state.feedback, bad: state.feedback.bad + 1 },
      }
    case 'ZERO':
      return state
    default:
      return state
  }
}

export default counterReducer
