import { createRoot } from "react-dom/client";
import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import "./index.css";
// import App from "./App";
import Schedule from "./components/Schedule";
// import About from "./About";
// import reportWebVitals from "./reportWebVitals";
// import "./App.css";

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript

root.render(
  <>
    <h1>NT DESK 0.0.1 💖</h1>
    <Schedule />
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
