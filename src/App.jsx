import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Page from "./pages/Page";
import SectionPage from "./pages/SectionPage";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import CategoryPage from "./pages/CategoryPage";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import ScrollTopRouter from "./components/ScrollTopRouter";
import Carrito from "./pages/Carrito";
import ScrollButton from "./components/ScrollButton";
import ShopAlert from "./components/ShopAlert";
import { InputProvider } from "./context/ContextInput";
import { CarritoProvider } from "./context/ContextCarrito";
import { useLoaderContext } from "./context/ContextLoader";

const App = () => {
  const { loader } = useLoaderContext();
  const [theme, setTheme] = useState("auto");
  const changeTheme = (newState) => setTheme(newState);

  return (
    <InputProvider>
      <CarritoProvider>
        <div className="App" data-theme={theme}>
          <ScrollTopRouter />
          <Navbar changeTheme={changeTheme} theme={theme} />
          {loader && <Loader />}
          <main>
            <Routes>
              <Route path="/" element={<HomePage />}>
                <Route exact path=":sort" element={<SectionPage />} />
              </Route>
              <Route exact path="category/:category" element={<CategoryPage />}>
                <Route
                  exact
                  path="/category/:category/:sort"
                  element={<SectionPage />}
                />
              </Route>
              <Route exact path="platform/:platform" element={<CategoryPage />}>
                <Route
                  exact
                  path="/platform/:platform/:sort"
                  element={<SectionPage />}
                />
              </Route>
              <Route path="all/search=:id" element={<SearchPage />} />
              <Route path=":platform/search=:id" element={<SearchPage />} />
              <Route exact path="game/:id/:title" element={<Page />} />
              <Route exact path="shop" element={<Carrito />} />
            </Routes>
            <ShopAlert />
            <ScrollButton />
          </main>
        </div>
      </CarritoProvider>
    </InputProvider>
  );
};

export default App;
