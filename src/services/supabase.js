import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://kfsyvzaoovjszsspnnwy.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtmc3l2emFvb3Zqc3pzc3Bubnd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAxODE0OTcsImV4cCI6MjAzNTc1NzQ5N30.W8_Lg6ulVopTPYm1VRsVDMAUXebxL2A55s4mNNMgTo8";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
