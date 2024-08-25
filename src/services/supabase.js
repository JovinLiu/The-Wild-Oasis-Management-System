//该文件用于创建supabase客户端，url和key类似于账号密码，输入账号密码然后导出supabase

import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://fkuukodiyrxtpftymbnu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZrdXVrb2RpeXJ4dHBmdHltYm51Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA1NjQ1MzAsImV4cCI6MjAyNjE0MDUzMH0.Ch8HghlK44pI92kg-IVnbUtzDafrGrHiH9yJO4GJZlQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
