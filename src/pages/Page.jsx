import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import useFetchApi from "../hooks/useFetchApi";
import ButtonCarrito from "../components/ButtonCarrito";
import Recomendations from "../components/Recomendations";
import Gallery from "../components/Gallery";
import { useLoaderContext } from "../context/ContextLoader";

const Page = () => {
  const [gameData, setGameData] = useState(null);
  const params = useParams();
  const [data, error, load] = useFetchApi(`game?id=${params.id}`);
  const { changeLoader } = useLoaderContext()

  useEffect(() => {
    changeLoader(load);
    setGameData(data);
  }, [data, load]);

  return (
    <>
      {gameData != null &&
            <>
              <header className="backPage">
                <section className="headPage">
                  <img src={gameData.thumbnail} alt="" />
                  <div className="headContainer">
                    <div className="headInfo">
                      <h1>{gameData.title}</h1>
                      {/* <span>developer: {gameData.developer}</span>    */}
                      <span>publisher: {gameData.publisher}</span>
                      <span>{gameData.short_description}</span>
                      {/* <span>{gameData.release_date}</span>    */}
                    </div>
                    <div className="headButtons">
                      {gameData.id && (
                        <ButtonCarrito
                          item={gameData.id}
                        />
                      )}
                      {gameData.game_url && (
                        <a href={gameData.game_url}>
                          <button className="buttonPlay">play</button>
                        </a>
                      )}
                    </div>
                  </div>
                </section>
              </header>
              <section className="pageContainer">
                {gameData.screenshots && (
                  <Gallery imagesArray={gameData.screenshots.flat()} />
                )}
                <section
                  className={gameData.minimum_system_requirements ? "pageContent" : "pageContent-short" }>
                  <div className="pageContentInfo">
                    <article className="pageArticle">
                      <h2>description</h2>
                      <p>{gameData.description}</p>
                    </article>

                    {gameData.minimum_system_requirements && (
                      <article className={gameData.minimum_system_requirements ? "pageArticle" : "pageArticle-short" }>
                        <h2>minimum requirements</h2>
                        <span>
                          <span>system:</span>
                          <p>{gameData.minimum_system_requirements.os == '?' || gameData.minimum_system_requirements.os == '' ?  '-' : gameData.minimum_system_requirements.os}</p>
                        </span>
                        <span>
                          <span>processor:</span>
                          <p>{gameData.minimum_system_requirements.processor =='?' || gameData.minimum_system_requirements.processor == '' ? '-' : gameData.minimum_system_requirements.processor}</p>
                        </span>
                        <span>
                          <span>memory:</span>
                          <p>{gameData.minimum_system_requirements.memory == '?' || gameData.minimum_system_requirements.memory == '' ? '-' : gameData.minimum_system_requirements.memory}</p>
                        </span>
                        <span>
                          <span>graphics:</span>
                          <p>{gameData.minimum_system_requirements.graphics == '?' || gameData.minimum_system_requirements.graphics == '' ? '-' : gameData.minimum_system_requirements.graphics}</p>
                        </span>
                        <span>
                          <span>storage:</span>
                          <p>{gameData.minimum_system_requirements.storage == '?' || gameData.minimum_system_requirements.storage == '' ?  '-' :  gameData.minimum_system_requirements.storage}</p>
                        </span>
                      </article>
                    )}
                  </div>
                  {
                    <Recomendations
                      category={gameData.genre}
                      description={gameData.short_description}
                      id={gameData.id}
                    />
                  }
                </section>
              </section>
            </>
          
        }
    </>
  );
};

export default Page;
