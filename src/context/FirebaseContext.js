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
      });

      delete user.password;
      return { ...user, uid };
    } catch (error) {
      alert(error);
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

  getBuds: async (uid) => {
    try {
      const snapshot = await db
        .collection('users')
        .doc(uid)
        .collection('buds')
        .get();
      return snapshot.docs.map((doc) => doc.data());
    } catch (error) {
      console.log('Error @getBuds ', error);
    }
  },

  addPost: async ({ uid, name, price, type, location, thc, cbd }) => {
    try {
      await db.collection('users').doc(uid).collection('buds').add({
        name,
        price,
        type,
        location,
        thc,
        cbd,
      });
    } catch (error) {
      alert(error);
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
