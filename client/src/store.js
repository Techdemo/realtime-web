import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import * as appReducers from './ducks';

const reducers = combineReducers({
    ...appReducers,
  });

export const store = createStore(reducers, applyMiddleware(thunk))
