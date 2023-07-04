import {combineReducers} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authReducer from './auth';
import deviceToken from './deviceToken';

const authConfig = {
  key: 'auth',
  storage: AsyncStorage,
};

const reducer = combineReducers({
  auth: persistReducer(authConfig, authReducer),
  deviceToken,
});

export default reducer;
