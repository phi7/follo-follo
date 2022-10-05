import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import InputList from "../components/InputList";
import LoginComponent from "../components/Login/LoginComponent";
import NavBar from "../components/NavBar";
import Title from "../components/Title";
import { useAuthentication } from "../hooks/authentication";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const { user } = useAuthentication();
  return (
    <>
      <NavBar />
      <br />
      <Title />
      {/* <InputList /> */}
      {user ? <InputList /> : <LoginComponent />}
    </>
  );
};

export default Home;
