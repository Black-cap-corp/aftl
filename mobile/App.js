import * as eva from '@eva-design/eva';
import {ApplicationProvider} from '@ui-kitten/components';
import React, {useEffect} from 'react';
import {default as theme} from './custom-theme.json';
import {AuthContext, contextvalues} from './shared/context/logincontext';
import AppNavigation from './navigation/AppNavigation';
import {default as mapping} from './mapping.json';
import VersionCheck from 'react-native-version-check';
import {Alert, BackHandler, Linking} from 'react-native';
import axios from 'axios';

const App = () => {
  const checkVersion = async () => {
    try {
      let updateNeeded = await VersionCheck.needUpdate();
      if (updateNeeded && updateNeeded.isNeeded) {
        //Alert the user and direct to the app url

        Alert.alert(
          'Please update',
          'You will have to update your app to the latest version to continue using.',
          [
            {
              text: 'Update',
              onPress: () => {
                BackHandler.exitApp();
                Linking.openURL(updateNeeded.storeUrl);
              },
            },
          ],
          {cancelable: false},
        );
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    checkVersion();
  }, []);

  axios.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      //  config.headers['Content-Type'] = 'multipart/form-data';
      console.log(config.headers);
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    },
  );

  // Add a response interceptor
  axios.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    },
  );

  const reducer = (state, action) => {
    switch (action.type) {
      case 'SIGN_IN':
        return {
          ...state,
          isSignedIn: true,
          user: action.user,
        };
      case 'SIGN_OUT':
        console.log('siii');
        return {
          ...state,
          isSignedIn: false,
          user: null,
        };
    }
  };
  const [state, dispatch] = React.useReducer(reducer, {
    isSignedIn: false,
    user: null,
  });

  return (
    <>
      <AuthContext.Provider value={{...contextvalues, dispatch}}>
        <ApplicationProvider
          {...eva}
          customMapping={mapping}
          theme={{...eva.light, ...theme}}>
          <AppNavigation state={state} dispatch={dispatch} />
        </ApplicationProvider>
      </AuthContext.Provider>
    </>
  );
};

export default App;
