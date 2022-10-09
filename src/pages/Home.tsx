import { A } from "@solidjs/router";
import { Component } from "solid-js";
import styles from "./../App.module.css";
import logo from "./../logo.svg";

const Home: Component = () => {
  return (
    <header class={styles.header}>
      <img src={logo} class={styles.logo} alt="logo" />
      <code class={styles.mt2}>This app is built with SolidJS</code>
      <br />
      <A class={styles.link} href="/insert" rel="noopener noreferrer">
        Insert
      </A>
      <A class={styles.link} href="/view" rel="noopener noreferrer">
        View
      </A>
    </header>
  );
};

export default Home;
