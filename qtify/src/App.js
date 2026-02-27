import React from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";

function App() {
  return (
    <BrowserRouter>
      <Navbar searchData={[]} />
      <Hero />
    </BrowserRouter>
  );
}

export default App;