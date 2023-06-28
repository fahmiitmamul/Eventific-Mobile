import {combineReducers} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import authReducer from './auth';

const authConfig = {
  key: 'auth',
  storage: AsyncStorage,
};

const reducer = combineReducers({
  auth: persistReducer(authConfig, authReducer),
});

export default reducer;
