import React from "react";
import env from "react-dotenv";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
