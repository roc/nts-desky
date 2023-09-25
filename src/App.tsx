import { createRoot } from "react-dom/client";
import React from "react";

import Schedule from "./components/Schedule";
// import reportWebVitals from "./reportWebVitals";
import "./inter-font.css";
import "./gooper-font.css";
import "./App.css";
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript

root.render(<Schedule />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
