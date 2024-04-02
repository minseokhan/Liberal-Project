import ClientOnly from "./components/ClientOnly";
import MainClient from "./components/MainClient";

export default function Home() {
  return (
    <ClientOnly>
      <MainClient />
    </ClientOnly>
  );
}
