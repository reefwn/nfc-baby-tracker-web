import { Component } from "solid-js";
import LatestList from "../components/LatestList";
import styles from "./../App.module.css";

const View: Component = () => {
  return (
    <div class={styles.body}>
      <LatestList />
    </div>
  );
};

export default View;
