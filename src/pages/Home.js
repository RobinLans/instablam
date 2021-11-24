import React from "react";
import { BsCameraFill, BsImages } from "react-icons/bs";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <section className="flex absolute top-16 ">
        <h1 className="text-6xl">Insta</h1>
        <h1 className="text-6xl text-primary">Blam</h1>
      </section>

      <Link to="/camera" className="group">
        <button className="frontPageBtn gr">
          <BsCameraFill className="text-7xl group-hover:text-primary" />
        </button>
      </Link>

      <Link to="/gallery" className="group">
        <button className="frontPageBtn ">
          <BsImages className="text-7xl group-hover:text-primary" />
        </button>
      </Link>
    </>
  );
}

export default Home;
