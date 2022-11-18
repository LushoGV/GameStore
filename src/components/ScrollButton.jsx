import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleUp } from "@fortawesome/free-solid-svg-icons";

const ScrollButton = () => {
  const [btnState, setBtnState] = useState(false);

  useEffect(() => {
    document.addEventListener("scroll", (e) => {
      window.scrollY > 170 ? setBtnState(true) : setBtnState(false);
    });
  }, [window.scrollY]);

  return (
    <button
      className={btnState ? "btnScroll-active" : "btnScroll-hidden"}
      onClick={() =>
        window.scroll({
          top: 0,
          behavior: "smooth",
        })
      }
    >
      <FontAwesomeIcon icon={faAngleDoubleUp} />
    </button>
  );
};

export default ScrollButton;
