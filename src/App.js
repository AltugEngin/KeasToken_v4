import "./App.css";
import { useEffect } from "react";
import { supabase } from "./supabaseClient";
import { Dapp } from "../src/components/Dapp";

/*
(async () => {
      console.log(await ReadData());
    })();
*/

function App() {
  return (
    <div className="App-header">
      <Dapp></Dapp>
    </div>
  );
}

export default App;
