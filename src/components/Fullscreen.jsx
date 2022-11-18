import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const Fullscreen = ({ imagesArray, imagePosition, FullscreenState }) => {
  const [images, setImages] = useState(null);
  const [imageSelect, setImageSelect] = useState(0);

  const changeImageSelect = (position) => {
    if (position == "left") {
      imageSelect == 0
        ? setImageSelect(images.length - 1)
        : setImageSelect(imageSelect - 1);
    } else {
      imageSelect == images.length - 1
        ? setImageSelect(0)
        : setImageSelect(imageSelect + 1);
    }
  };

  useEffect(() => {
    setImageSelect(0);

    if (imagesArray.length > 4) {
      imagesArray = imagesArray.slice(0, 3);
      setImages(imagesArray);
    } else setImages(imagesArray);

    setImageSelect(imagePosition);
  }, [imagesArray, imagePosition]);

  return (
    <section className="fullscreenSection">
      {images != null && (
        <div className="fullscreenContent">
          {FullscreenState && (
            <button
              className="fullscreenClose"
              onClick={() => FullscreenState(false)}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          )}
          <button
            className="fullscreenArrow"
            onClick={() => changeImageSelect("left")}
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
          <div>
            <img
              className="imagenprueba"
              src={images[imageSelect].image}
              alt=""
            />
          </div>
          <button
            className="fullscreenArrow"
            onClick={() => changeImageSelect("right")}
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </div>
      )}
    </section>
  );
};

export default Fullscreen;
