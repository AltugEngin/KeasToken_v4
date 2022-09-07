import { supabase } from "./supabaseClient";

export default async function ReadData() {
  return await supabase.from("Addresses").select("*");
}
