import Section from "../components/Section";
import { Outlet, useParams } from "react-router-dom";
import Banner from "../components/Banner";

const HomePage = () => {
  let params = useParams();

  return (
    <>
      {params.sort ? (
        <Outlet />
      ) : (
        <>
          <Banner />
          <Section title="latest releases" param="release-date" />
          <Section title="popularity" param="popularity" />
          <Section title="relevance" param="relevance" />
        </>
      )}
    </>
  );
};

export default HomePage;
