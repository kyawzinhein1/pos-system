import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";

const Index = () => {
  return (
    <section>
      <Nav />
      <div className="px-5">
        <Outlet />
      </div>
    </section>
  );
};

export default Index;
