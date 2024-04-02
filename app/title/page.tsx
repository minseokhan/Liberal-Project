import ClientOnly from "../components/ClientOnly";
import TitleSearchClient from "./TitleSearchClient";

const TitleSearchPage = () => {
  return (
    <ClientOnly>
      <TitleSearchClient />
    </ClientOnly>
  );
};

export default TitleSearchPage;
