import React, { createContext } from 'react';
import Constants from 'expo-constants';

import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: Constants.manifest.extra.apiKey,
  authDomain: Constants.manifest.extra.authDomain,
  projectId: Constants.manifest.extra.projectId,
  storageBucket: Constants.manifest.extra.storageBucket,
  messagingSenderId: Constants.manifest.extra.messagingSenderId,
  appId: Constants.manifest.extra.appId,
};

const FirebaseContext = createContext();

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.firestore();

const Firebase = {
  getCurrentUser: () => {
    return firebase.auth().currentUser;
  },

  createUser: async (user) => {
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password);
      const uid = Firebase.getCurrentUser().uid;

      await db.collection('users').doc(uid).set({
        name: user.name,
        email: user.email,
        buds: user.buds,
      });

      delete user.password;
      return { ...user, uid, buds };
    } catch (error) {
      console.log('Error @createUser: ', error);
    }
  },

  getUserInfo: async (uid) => {
    try {
      const user = await db.collection('users').doc(uid).get();

      if (user.exists) {
        return user.data();
      }
    } catch (error) {
      console.log('Error @getuserinfo: ', error);
    }
  },

  logout: async () => {
    try {
      await firebase.auth().signOut();

      return true;
    } catch (error) {
      console.log('Error @logout: ', error);
    }

    return false;
  },

  login: async (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  },
};

const FirebaseProvider = (props) => {
  return (
    <FirebaseContext.Provider value={Firebase}>
      {props.children}
    </FirebaseContext.Provider>
  );
};

export { FirebaseContext, FirebaseProvider };
