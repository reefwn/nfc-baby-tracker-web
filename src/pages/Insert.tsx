import { Component } from "solid-js";
import { Form } from "../components/Form";
import styles from "./../App.module.css";

const Insert: Component = () => {
  return (
    <div class={styles.body}>
      <Form />
    </div>
  );
};

export default Insert;
