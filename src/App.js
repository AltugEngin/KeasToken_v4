import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

import ReadData from "./ReadData";

import { supabase } from "./supabaseClient";

/*
(async () => {
      console.log(await ReadData());
    })();
*/

function App() {
  useEffect(() => {
    WriteData();
  }, []);

  const WriteData = async () => {
    await supabase.from("Addresses").insert({
      name: "Altug",
      surname: "Engin",
      address: "0x58FBbD0B6A3c57232A652e18D21671D88dF0cd5E",
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
