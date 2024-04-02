import ClientOnly from "../components/ClientOnly";
import AdminClient from "./AdminClient";

const AdminPage = () => {
  return (
    <ClientOnly>
      <AdminClient />
    </ClientOnly>
  );
};

export default AdminPage;
