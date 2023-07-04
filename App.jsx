import 'react-native-gesture-handler';
import Main from './src/screen/Main';
import React from 'react';
import {Provider} from 'react-redux';
import {persistor, store} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {PermissionsAndroid} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {setToken} from './src/redux/reducers/deviceToken';

PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

const checkToken = async () => {
  const fcmToken = await messaging().getToken();
  if (fcmToken) {
    console.log(fcmToken);
    store.dispatch(setToken(fcmToken));
  }
};

checkToken();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Main />
      </PersistGate>
    </Provider>
  );
};

export default App;
