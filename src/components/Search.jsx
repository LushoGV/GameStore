import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowLeft, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import useFetchApi from "../hooks/useFetchApi";

const Search = ({ inputState, hideInput }) => {
  const [results, setResults] = useState(null);
  const refInput = useRef(null);
  const navigate = useNavigate();
  const [data] = useFetchApi(`games`);
  const handleKeyPress = (e) => e.keyCode == 13 && SubmitData();
  const search = () =>
    refInput.current.value.trim() == null || refInput.current.value.trim() == ""
      ? setResults(null)
      : filter();

  const filter = () => {
    let arrayFilter = data.filter((item) => {
      if (
        item.title
          .trim()
          .toLowerCase()
          .startsWith(refInput.current.value.trim().toLowerCase())
      )
        return true;
    });
    let secondArrayFilter = data.filter((item) => {
      if (
        item.title
          .trim()
          .toLowerCase()
          .includes(refInput.current.value.trim().toLowerCase()) &&
        !arrayFilter.includes(item)
      )
        return true;
    });
    arrayFilter = arrayFilter.concat(secondArrayFilter);
    setResults(arrayFilter.slice(0, 6));
  };

  const SubmitData = () => {
    if (refInput.current.value.trim() != "") {
      if (results != null && results.length == 1 && results != "")
        navigate("/game/" + results[0].id);
      //si solo hay 1 resultado, se redirecciona directamente a la pagina del juego
      else
        navigate("/all/search=" + refInput.current.value.trim().toLowerCase()); //sino se redirecciona a la pagina de busqueda
      setResults(null);
      inputState && hideInput();
    }
  };

  const closeInput = () => {
    refInput.current.value = "";
    hideInput();
    setResults(null);
  };

  return (
    <>
      <div className={inputState ? "navInput-active" : "navInput-hidden"}>
        <div className="inputButton">
          <FontAwesomeIcon icon={faSearch} className="resultIcon" />

          <input
            ref={refInput}
            className="input"
            type="text"
            placeholder="Search"
            onKeyDown={(e) => handleKeyPress(e)}
            onBlur={() => {
              setTimeout(() => {
                inputState ? closeInput() : setResults(null);
              }, 150);
            }}
            onFocus={() => search()}
            onChange={() => search()}
          />

          <button className="navButton" onClick={() => closeInput()}>
            <FontAwesomeIcon
              icon={faLongArrowLeft}
              className="searchIcon-active"
            />
          </button>
        </div>
        <hr />
        {results != null && (
          <ul className="resultsContainer-active">
            {results.map((val, index) => {
              return (
                <Link to={`/game/${val.id}/${val.title}`} key={index}>
                  <li className="cardResult">
                    <img src={val.thumbnail} alt="" />
                    <div className="resultText">
                      <p className="resultTitle">{val.name || val.title}</p>
                      <p className="resultType">{val.genre}</p>
                    </div>
                    <p className="resultId">{val.id}</p>
                  </li>
                </Link>
              );
            })}
            <li className="moreResults" onClick={() => SubmitData()}>
              search "{refInput.current.value}"
            </li>
          </ul>
        )}
      </div>
    </>
  );
};

export default Search;
