import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import useFetchApi from "../hooks/useFetchApi";
import ButtonCarrito from "../components/ButtonCarrito";
import Recomendations from "../components/Recomendations";
import Gallery from "../components/Gallery";

const Page = ({ changeLoader }) => {
  const [gameData, setGameData] = useState(null);
  const params = useParams();
  const [data, error, load] = useFetchApi(`game?id=${params.id}`);

  useEffect(() => {
    changeLoader(load);
    setGameData([data]);//data sin []
  }, [data, load]);

  return (
    <>
      {gameData != null &&
        gameData.map((item, index) => {//borrar y usarlo como objeto

          return (
            <>
              <header className="backPage">
                <section className="headPage">
                  <img src={item.thumbnail} alt="" />
                  <div className="headContainer">
                    <div className="headInfo">
                      <h1>{item.title}</h1>
                      {/* <span>developer: {item.developer}</span>    */}
                      <span>publisher: {item.publisher}</span>
                      <span>{item.short_description}</span>
                      {/* <span>{item.release_date}</span>    */}
                    </div>
                    <div className="headButtons">
                      {item.id && (
                        <ButtonCarrito
                          item={item.id}
                        />
                      )}
                      {item.game_url && (
                        <a href={item.game_url}>
                          <button className="buttonPlay">play</button>
                        </a>
                      )}
                    </div>
                  </div>
                </section>
              </header>
              <section className="pageContainer">
                {item.screenshots && (
                  <Gallery imagesArray={item.screenshots.flat()} />
                )}
                <section
                  className={item.minimum_system_requirements ? "pageContent" : "pageContent-short" }>
                  <div className="pageContentInfo">
                    <article className="pageArticle">
                      <h2>description</h2>
                      <p>{item.description}</p>
                    </article>

                    {item.minimum_system_requirements && (
                      <article className={item.minimum_system_requirements ? "pageArticle" : "pageArticle-short" }>
                        <h2>minimum requirements</h2>
                        <span>
                          <span>system:</span>
                          <p>{item.minimum_system_requirements.os == '?' || item.minimum_system_requirements.os == '' ?  '-' : item.minimum_system_requirements.os}</p>
                        </span>
                        <span>
                          <span>processor:</span>
                          <p>{item.minimum_system_requirements.processor =='?' || item.minimum_system_requirements.processor == '' ? '-' : item.minimum_system_requirements.processor}</p>
                        </span>
                        <span>
                          <span>memory:</span>
                          <p>{item.minimum_system_requirements.memory == '?' || item.minimum_system_requirements.memory == '' ? '-' : item.minimum_system_requirements.memory}</p>
                        </span>
                        <span>
                          <span>graphics:</span>
                          <p>{item.minimum_system_requirements.graphics == '?' || item.minimum_system_requirements.graphics == '' ? '-' : item.minimum_system_requirements.graphics}</p>
                        </span>
                        <span>
                          <span>storage:</span>
                          <p>{item.minimum_system_requirements.storage == '?' || item.minimum_system_requirements.storage == '' ?  '-' :  item.minimum_system_requirements.storage}</p>
                        </span>
                      </article>
                    )}
                  </div>
                  {
                    <Recomendations
                      category={item.genre}
                      description={item.short_description}
                      id={item.id}
                    />
                  }
                </section>
              </section>
            </>
          );
        })}
    </>
  );
};

export default Page;
