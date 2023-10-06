import React from "react";
import BrandTitle from "../components/BrandTitle";
import AddTask from "../components/AddTask";
import FetchTask from "../components/FetchTask";

const Home = () => {
  return (
    <div className="w-full min-h-[85vh] md:min-h-[80vh]">
      <BrandTitle />
      <AddTask />
      <FetchTask />
    </div>
  );
};

export default Home;
