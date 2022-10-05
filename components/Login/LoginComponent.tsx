import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Login, Logout, useAuthentication } from "../../hooks/authentication";
// import { Login, Logout, useAuthentication } from "./hooks/authentication";
// import styles from "../styles/Home.module.css";

export default function LoginComponent() {
  const { user } = useAuthentication();
  const router = useRouter();
  //   useEffect(() => {
  //     if (user) {
  //       router.push("/createpost");
  //     }

  //     return () => {
  //       //second
  //       router.push("/createpost");
  //     };
  //   }, [user]);

  return (
    <div className="flex flex-col justify-center items-center m-20">
      <div className="m-5">Twitterでログインすると使えるようになります！</div>
      {!user ? (
        <button
          className="btn m-5"
          onClick={() => {
            Login();
          }}
        >
          ログイン
        </button>
      ) : (
        <button onClick={() => Logout()}>ログアウト</button>
      )}
      {/* <div>
          <pre>{user ? "" : "ログインしていません"}</pre>
        </div> */}
      {/* <button onClick={() => router.push("/")}>戻る</button> */}
      <div className="m-5">
        ログイン後，このページが表示されても少々お待ち下さい．５秒以内に遷移します．
      </div>
    </div>
  );
}
