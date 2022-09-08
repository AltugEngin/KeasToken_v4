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

  return <Dapp></Dapp>;
}

export default App;
