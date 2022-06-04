import { useState, useEffect } from "react";
import {useParams,useNavigate,Outlet,} from "react-router-dom";
import CardGrid from "../components/CardGrid";
import Section from "../components/Section";
import { useLoaderContext } from "../context/ContextLoader";
import useFetchApi from "../hooks/useFetchApi";

const CategoryPage = () => {

  const navigate = useNavigate();
  const params = useParams();
  const [content, setContent] = useState([]);
  const { loader, changeLoader } = useLoaderContext()
  
  let param;
  let textParam;

  if (params.category) {
    param = params.category;
    textParam = "category";
  } else {
    param = params.platform;
    textParam = "platform";
  }

  const [data, error, load] = useFetchApi(
    `games?${textParam}=${param}&sort-by=alphabetical`,
    true
  );

  useEffect(() => {
    if (data.status == 0 || data.status == 404) navigate(`/`);
    else {
      changeLoader(load);
      setContent([]);
      setContent(data);
    }
  }, [data, load]);

  return (
    <>
      {params.sort ? (
        <Outlet />
      ) : (
        <>
          <header className="headerPage">
            <ul>
              {params.category ? (
                <li>{params.category}</li>
              ) : (
                <li>{params.platform}</li>
              )}
            </ul>
          </header>
          <Section
            title="latest releases"
            param="release-date"
          />
          <section className="resultsGridContainer">
            {!loader && (
              <CardGrid
                contentGrid={content}
              />
            )}
          </section>
        </>
      )}
    </>
  );
};

export default CategoryPage;
