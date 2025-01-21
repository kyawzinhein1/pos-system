import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return <section className="flex justify-between px-6 py-3 bg-slate-300">
    <div>
      <Link to={"/"}>Logo</Link>
    </div>
    <div className="flex gap-2">
      <Link to={"/dashboard"} className="font-semibold text-gray-600">Dashboard</Link>
      <Link to={"/products"} className="font-semibold text-gray-600">Products</Link>
      <Link to={"/sale"} className="font-semibold text-gray-600">Sale</Link>
    </div>
  </section>;
};

export default Nav;
