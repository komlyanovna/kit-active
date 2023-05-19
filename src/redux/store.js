import { applyMiddleware, createStore, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers/index'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const middleware = [thunk]

const USER_TOKEN = ['USER_TOKEN']

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware)),
)

store.subscribe(() => {
  const storeState = store.getState()
  const { user } = storeState
  localStorage.setItem(USER_TOKEN, JSON.stringify(user))
})
