import { combineReducers } from 'redux';
import { regionReducer } from './region.js';

export const rootReducer = combineReducers({
  data: regionReducer
});
