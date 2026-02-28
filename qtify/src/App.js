import React from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Section from "./components/Section/Section";

function App() {
  return (
    <BrowserRouter>
      <Navbar searchData={[]} />
      <Hero />
      <Section title="Top Albums" />
    </BrowserRouter>
  );
}

export default App;