import React from 'react';
import axios from 'axios';
import {APP_BASE_URL} from '../../app.const';
import {storeUser} from '../../app.storage';

export const AuthContext = React.createContext();

export const contextvalues = {
  signIn: async (logindetails, dispatch, setError, setSubmitting) => {
    // sign in
    // call the api to get user details
    try {
      const result = await axios.post(
        `${APP_BASE_URL}/appuser/verifyUser`,
        logindetails,
        {
          Headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log(result.data);
      if (result.data.status === 'success') {
        storeUser(result.data.user);
        dispatch({type: 'SIGN_IN', user: result.data.user});
      } else {
        setError(result.data.message);
      }
      setSubmitting(false);
    } catch (e) {
      console.log('error', e);
      setError({showError: true, error: e.response.data});
      setSubmitting(false);
    }

    // dispatch({type: 'SIGN_IN', user: {isSignedIn: true}});
  },
  signOut: async dispatch => {
    // sign Out
    //clear user details
    dispatch({type: 'SIGN_OUT'});
  },
};
