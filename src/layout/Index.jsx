import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";

const Index = () => {
  return (
    <section>
      <Nav />
      <Outlet />
    </section>
  );
};

export default Index;
