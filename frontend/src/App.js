import { BrowserRouter } from "react-router-dom";
import styles from "./App.module.css";
import AppRoutes from "./Routes";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import { createContext } from "react";
import { useSelector } from "react-redux";

function App() {
  let user = useSelector((state) => state.user);

  return (
    <>
      <UserContext.Provider value={user}>
        <Header></Header>
        <div className={styles.content}>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </div>
        <Footer />
      </UserContext.Provider>
    </>
  );
}

export default App;

export const UserContext = createContext("");
