import { ToastContainer } from "react-toastify";
import { QueryClientProvider } from "react-query";

import AuthProvider from "./components/AuthProvider";
import Layout from "./components/Layout";

import { queryClient } from "./react-query/config";

import styles from "./App.module.scss";
import { Route, Switch } from "react-router";
import Intro from "./pages/Intro";


function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <Layout>
        <ToastContainer
          bodyClassName={styles.ToastBody}
          toastClassName={styles.Toast}
          className={styles.ToastCotainer}
          hideProgressBar
          position="bottom-center"
          autoClose={2000}
          limit={1}
        />
        <Switch>
          <Route path="/">
            <Intro/>
          </Route>
        </Switch>
      </Layout>
    </AuthProvider>
  </QueryClientProvider>
  );
}

export default App;
