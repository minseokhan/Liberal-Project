import ClientOnly from "../components/ClientOnly";
import TestClient from "./TestClient";

const TestPage = () => {
  return (
    <ClientOnly>
      <TestClient />
    </ClientOnly>
  );
};

export default TestPage;
