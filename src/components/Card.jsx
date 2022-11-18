import { Link } from "react-router-dom";
import ButtonCarrito from "./ButtonCarrito";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChrome, faWindows } from "@fortawesome/free-brands-svg-icons";

const Card = ({ type, title, image, id, publisher, platform }) => {
  return (
    <li className="card">
      <ButtonCarrito item={id} />
      <Link to={`/game/${id}/${title}`}>
        <div className="cardImage">
          <img src={image} alt="" />
        </div>
        <div className="cardText">
          <div className="NameAndNameCompany">
            <span className="cardName">{title}</span>
            <span className="cardNameCompany">{publisher}</span>
          </div>
          <div className="cardPlatform">
            {platform == "PC (Windows)" ? (
              <span>
                <FontAwesomeIcon icon={faWindows} />
              </span>
            ) : platform.includes("PC (Windows), Web Browser") ? (
              <>
                <span>
                  <FontAwesomeIcon icon={faChrome} />
                </span>
                <span>
                  <FontAwesomeIcon icon={faWindows} />
                </span>
              </>
            ) : (
              <span>
                <FontAwesomeIcon icon={faChrome} />
              </span>
            )}
          </div>
          <p className="cardType">{type}</p>
          <p className="cardid">{id}</p>
        </div>
      </Link>
    </li>
  );
};

export default Card;
