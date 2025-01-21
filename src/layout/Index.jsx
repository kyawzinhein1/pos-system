import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";

const Index = () => {
  return (
    <section className="max-w-5xl mx-auto">
      <Nav />
      <Outlet />
    </section>
  );
};

export default Index;
