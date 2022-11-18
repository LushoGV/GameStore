import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useFetchApi from "../hooks/useFetchApi";
import Card from "./Card";
import Carousel from "react-elastic-carousel";

const Section = ({ title, param }) => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const params = useParams();
  let parametro = "";
  let textParam = "";

  if (params.category) {
    parametro = params.category;
    textParam = "category=";
  } else if (params.platform) {
    parametro = params.platform;
    textParam = "platform=";
  }

  const [data] = useFetchApi(`games?${textParam + parametro}&sort-by=${param}`);

  const breakPoints = [
    { width: 450, itemsToShow: 1 },
    { width: 600, itemsToShow: 2 },
    { width: 1024, itemsToShow: 3 },
    { width: 1440, itemsToShow: 4 },
    { width: 2560, itemsToShow: 5 },
  ];

  useEffect(() => {
    if (data.status == 0 || data.status == 404) navigate(`/`);
    else setItems(data.slice(0, 6));
  }, [data]);

  return (
    <section className="boxCard">
      <span className="SectionTitle">
        <div className="boxCardTitle">{title && <h2>{title}</h2>}</div>
        <Link
          to={
            location.pathname == "/"
              ? `/${param}`
              : `${location.pathname}/${param}`
          }
        >
          <button>see more</button>
        </Link>
      </span>
      <ul className="boxCardContainer">
        <Carousel breakPoints={breakPoints} showArrows={false}>
          {items.map((item, index) => {
            return (
              <Card
                key={index}
                title={item.title}
                image={item.thumbnail}
                type={item.genre}
                id={item.id}
                publisher={item.publisher}
                platform={item.platform}
                short_description={item.short_description}
              />
            );
          })}
        </Carousel>
      </ul>
    </section>
  );
};

export default Section;
