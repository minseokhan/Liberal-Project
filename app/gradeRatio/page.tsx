import ClientOnly from "../components/ClientOnly";
import GradeRatioClient from "./GradeRatioClient";

const GradeRatioPage = () => {
  return (
    <ClientOnly>
      <GradeRatioClient />
    </ClientOnly>
  );
};

export default GradeRatioPage;
