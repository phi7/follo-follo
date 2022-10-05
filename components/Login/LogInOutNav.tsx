import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Login, Logout, useAuthentication } from "../../hooks/authentication";
// import { Login, Logout, useAuthentication } from "./hooks/authentication";
// import styles from "../styles/Home.module.css";

export default function LogiInOutNav() {
  const { user } = useAuthentication();

  return (
    <div className="flex flex-col justify-center items-center">
      {!user ? (
        <button
          className="btn "
          onClick={() => {
            Login();
          }}
        >
          ログイン
        </button>
      ) : (
        <button onClick={() => Logout()}>ログアウト</button>
      )}
    </div>
  );
}
