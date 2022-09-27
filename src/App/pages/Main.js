import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Menu from "../UI/Menu";
import Map from "./Map";
import Table from "./Table";
import "./Main.css";

export default function Main() {
  return (
    <BrowserRouter>
      <Menu>
      </Menu>
        <Routes>
          <Route exact path="/" element={<Map />} />
          <Route exact path="/table" element={<Table />} />
        </Routes>
    </BrowserRouter>
  );
}
