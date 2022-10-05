import { initializeApp, getApps } from "firebase/app";

import "firebase/analytics";
import { getAuth } from "firebase/auth";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";

export const config = {
  // 省略
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};
//サーバーでの不要な読み込みを避ける
//また，１度読み込んだあとは再読み込みは許されないのでそれも避けている
//v9で変更
// !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
!getApps().length ? initializeApp(config) : getApps()[0];

//v9で変更
//export const auth = firebase.auth();
export const auth = getAuth();
export const db = getFirestore();