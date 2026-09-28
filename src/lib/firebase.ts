import AsyncStorage from '@react-native-async-storage/async-storage';
import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app';
import { Auth, getAuth, getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { Platform } from 'react-native';

const firebaseConfig = {
  apiKey: 'AIzaSyAwNtPtGmD7-V871Rb1o29r8U_-EdbFCZI',
  authDomain: 'jdprep-14213.firebaseapp.com',
  projectId: 'jdprep-14213',
  storageBucket: 'jdprep-14213.firebasestorage.app',
  messagingSenderId: '971290906733',
  appId: '1:971290906733:ios:7d8c6ebac50ee06fa92f64',
};

export const firebaseApp: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);

function createAuth(): Auth {
  if (Platform.OS === 'web') return getAuth(firebaseApp);
  try {
    return initializeAuth(firebaseApp, { persistence: getReactNativePersistence(AsyncStorage) });
  } catch {
    // Fast refresh can re-evaluate this module while preserving the Firebase app.
    return getAuth(firebaseApp);
  }
}

export const auth: Auth = createAuth();
