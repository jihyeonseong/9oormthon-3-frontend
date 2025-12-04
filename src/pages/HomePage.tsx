import React from "react";
import { QuestionTest } from "../components/QuestionTest";
import { BusInfoTest } from "../components/BusInfoTest";

const HomePage: React.FC = () => {
  return (
    <>
      <h1>홈페이지</h1>
      <QuestionTest />
      <BusInfoTest />
    </>
  );
};

export default HomePage;
