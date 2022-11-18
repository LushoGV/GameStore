import { useContext, useState } from "react";
import Search from "./Search";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faSearch,
  faTimes,
  faCartShopping,
  faAngleDown,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import BarLeft from "./BarLeft";
import ThemeButton from "./ThemeButton";
import categoriesList from "../CategoriesList.js";
import { useInputContext } from "../context/ContextInput";
import { useCarritoContext } from "../context/ContextCarrito";

const Navbar = ({ changeTheme, theme }) => {
  const [barState, setBarState] = useState(false);
  const changeBar = () => setBarState(!barState);
  const { inputActive, inputState } = useInputContext();
  const { shopContent } = useCarritoContext();
  const navigate = useNavigate();
  const objList = [
    ["category", "platform"],
    [categoriesList.flat(), ["pc", "browser"]],
  ];

  return (
    <>
      <nav className="navBar">
        <div className="navContent">
          <div className="navBox">
            <div className="logoBox">
              <Link to="/">
                <img
                  onClick={() => setBarState(false)}
                  className="logo"
                  src="https://www.freetogame.com/assets/images/freetogame-logo.png"
                  alt=""
                ></img>
              </Link>
            </div>
            <ul className="navBtnContainer">
              {objList[0].map((item, index) => {
                return (
                  <li key={index} className="navBtn">
                    <button>
                      <span>{item}</span>
                      <FontAwesomeIcon icon={faAngleDown} />
                    </button>
                    <div className="dropMenu-active">
                      <ul>
                        {objList[1][index].map((element, number) => {
                          return (
                            <li
                              key={number}
                              className="dropMenu-option"
                              onClick={() => navigate(`/${item}/${element}`)}
                            >
                              {element}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="navBox">
            <button
              className="navInputButton"
              onClick={() => {
                inputActive(), setBarState(false);
              }}
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
            <Search hideInput={inputActive} inputState={inputState} />
            <ThemeButton changeTheme={changeTheme} theme={theme} />           
            <Link to="/shop">
              <button
                className="navShopButton"
                onClick={() => setBarState(false)}
              >
                <FontAwesomeIcon icon={faBookmark} />
              </button>
            </Link>
            <div className="navBox">
              <button className="navMenuButton" onClick={changeBar}>
                {barState ? (
                  <FontAwesomeIcon icon={faTimes} />
                ) : (
                  <FontAwesomeIcon icon={faBars} />
                )}
              </button>
            </div>
          </div>
        </div>
        <BarLeft
          BarValue={barState}
          hideBar={changeBar}
          changeTheme={changeTheme}
          theme={theme}
        />
      </nav>
    </>
  );
};

export default Navbar;
