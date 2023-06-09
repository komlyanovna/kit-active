const initialState = {
  user: '',
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'USER__TOKEN':
      return {
        ...state,
        user: action.payload,
      }
    default:
      return state
  }
}
