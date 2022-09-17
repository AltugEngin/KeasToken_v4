import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

const style = {
  border: "1px solid black",
};

async function ReadJSON() {
  let { data, error } = await supabase.from("Kaizens").select("*");
  return data;
}

export function TableData() {
  const [data, getData] = useState([]);

  useEffect(() => {
    ReadJSON().then((data) => {
      getData(data);
    });
  }, []);

  return (
    <div>
      <h1>Mevcut Kaizen Bildirimleri</h1>
      <tbody>
        <tr>
          <th>Id</th>
          <th>Tarih</th>
          <th>Bildirim</th>
          <th>Açıklama</th>
        </tr>
        {data.map((item, i) => (
          <tr key={i}>
            <td style={style}>{item.id}</td>
            <td style={style}>{item.created_at}</td>
            <td style={style}>{item.Bildirim}</td>
            <td style={style}>{item.Aciklama}</td>
          </tr>
        ))}
      </tbody>
    </div>
  );
}
