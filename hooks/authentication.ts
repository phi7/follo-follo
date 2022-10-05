import firebase from "firebase/app";
import { auth } from "../lib/firebase";
import { useEffect, useState } from "react";
import { atom, useRecoilState } from "recoil";
import { User } from "../models/User";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import {
  getRedirectResult,
  TwitterAuthProvider,
  signInWithRedirect,
} from "firebase/auth";

//atomをつけることでこれまでcomponent内でしか使えなかったstateが，外部からアクセス可能になった．
const userState = atom<User | null>({
  key: "user",
  default: null,
  dangerouslyAllowMutability: true,
});

// interface AccessTokenSet {
//   accessToken: string | null;
//   accessTokenSecret: string | null;
// }

// 最新のfirebaseUserをステートとして返す関数
export function useAuthentication() {
  //ログインの状態管理
  const [user, setUser] = useRecoilState(userState);
  // const [accessTokenSet, setAccessTokenSet] = useState<AccessTokenSet>({
  //   accessToken: null,
  //   accessTokenSecret: null,
  // });

  console.log("Start useEffect!");

  useEffect(() => {
    // firebase auth state の購読
    // () => Login() でTwitterログインしたらRecoilStateをsetするための処理
    //v9で変更
    // const unsub = firebase.auth().onAuthStateChanged(function (firebaseUser) {
    //   if (firebaseUser) {
    //     console.log('Set user')
    //     setUser({
    //       uid: firebaseUser.uid,
    //       providerId: firebaseUser.providerId,
    //       displayName: firebaseUser.displayName
    //     })
    //   } else {
    //     // User is signed out.
    //     setUser(null)
    //   }
    // })
    //console.log(user);
    console.log("hoge");
    //const auth = getAuth();
    const unsub = onAuthStateChanged(auth, (user) => {
      //console.log(user);
      if (user) {
        console.log("Set user");
        console.log(user);
        setUser({
          uid: user.uid,
          // twiimg: user.photoURL,
          // screenName: user["reloadUserInfo"].screenName,
          displayName: user.displayName,
          accessToken: null,
          accessTokenSecret: null,
        });
        //console.log(user["reloadUserInfo"].screenName);
      } else {
        //console.log("hoge else");
        // User is signed out.
        setUser(null);
      }
    });

    // TwitterのOAuthトークンを取得したい場合のみ（Twitter APIを使って追加情報を取得するなど）
    // SignInWithRedirect()で戻ってきたときにresultを取得する
    // firebase.auth()
    //   .getRedirectResult()
    //   .then((result) => {
    //     console.log('result: ', result)
    //     if (result.credential) {
    //       /** @type {firebase.auth.OAuthCredential} */
    //       var credential: firebase.auth.OAuthCredential = result.credential;

    //       // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
    //       // You can use these server side with your app's credentials to access the Twitter API.
    //       var token = credential.accessToken;
    //       var secret = credential.secret;
    //       // ...
    //     }

    //     // The signed-in user info.
    //     var user = result.user;
    //   }).catch((error) => {
    //     // Handle Errors here.
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     // The email of the user's account used.
    //     var email = error.email;
    //     // The firebase.auth.AuthCredential type that was used.
    //     var credential = error.credential;
    //     // ...
    //   });

    //v8→v9でgetRedirectResultの使い方が違う
    //const auth = getAuth();
    getRedirectResult(auth)
      .then((result) => {
        console.log("result: ", result);
        const credential = TwitterAuthProvider.credentialFromResult(result!);
        const token = credential!.accessToken;
        const secret = credential!.secret;
        //外部から関数でアクセスするため
        setUser({
          uid: user!.uid,
          // twiimg: user!.photoURL,
          // screenName: user["reloadUserInfo"].screenName,
          displayName: user!.displayName,
          accessToken: token!,
          accessTokenSecret: secret!,
        });

        // The signed-in user info.
        //var user = result.user;
      })
      .catch((error) => {
        //   var user = {
        //                 uid: "uid",
        //   providerId: "userproviderId",
        //   displayName: "displayName"
        //                 };
        console.log(error);
        console.log("errorじゃよ");
        //console.log(user);
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });

    // コンポーネント削除時に購読をクリーンアップ
    return () => unsub();
  }, []); // useEffectを1回だけ呼ぶために第2引数に[]を渡す

  return { user };
}

// ここでTwitterログイン
export const Login = () => {
  console.log("Login..");
  //v8→v9変更
  //const provider = new auth.TwitterAuthProvider();
  const provider = new TwitterAuthProvider();
  //v8→v9変更
  //   auth
  //     .signInWithRedirect(provider)
  //     .then(function (result: any) {
  //       console.log('Logged in successfully')
  //       console.log('result: ', result)
  //       return result;
  //     })
  //     .catch(function (error) {
  //       console.error(error);
  //     });
  signInWithRedirect(auth, provider)
    .then(function (result: any) {
      console.log("Logged in successfully");
      console.log("result: ", result);
      return result;
    })
    .catch(function (error) {
      console.log("error!");
      console.error(error);
    });
};

export const Logout = () => {
  //const auth = getAuth();
  console.log("prelogOUT");
  signOut(auth)
    .then(() => {
      window.location.reload();
      console.log("logOUT");
    })
    .catch((error) => {
      // An error happened.
    });
  console.log("logOUT");
};
