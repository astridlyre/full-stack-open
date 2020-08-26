import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const siteInfo = {
  title: "The Phonebook",
  author: "Astrid Lyre",
  phone: "+1(812)671-8192",
  git: "astridlyre",
  copyright: "2020",
};

ReactDOM.render(
  <React.StrictMode>
    <App siteInfo={siteInfo} />
  </React.StrictMode>,
  document.getElementById("root")
);
