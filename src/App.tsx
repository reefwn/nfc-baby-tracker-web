import { HopeProvider, HopeThemeConfig } from "@hope-ui/solid";
import { useRoutes } from "@solidjs/router";
import { Component } from "solid-js";
import styles from "./App.module.css";
import { routes } from "./routes";

const config: HopeThemeConfig = {
  lightTheme: {
    colors: {},
  },
};

const App: Component = () => {
  const Routes = useRoutes(routes);

  return (
    <HopeProvider config={config}>
      <div class={styles.App}>
        <Routes />
      </div>
    </HopeProvider>
  );
};

export default App;
