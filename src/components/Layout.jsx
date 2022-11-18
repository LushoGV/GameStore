import { Outlet } from "react-router-dom";
import { useEffect } from "react/cjs/react.production.min";
import { useLoaderContext } from "../context/ContextLoader";
import Loader from "./Loader";
import Navbar from "./Navbar";

const Layout = ({ changeTheme, theme }) => {
  const { loader, changeLoader } = useLoaderContext();

  useEffect(() => {
    changeLoader(false);
  }, []);

  return (
    <>
      <Navbar changeTheme={changeTheme} theme={theme} />
      {loader && <Loader />}
      <Outlet />
    </>
  );
};

export default Layout;
