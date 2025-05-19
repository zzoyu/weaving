import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function LogoutPage() {
  const supabase = createClient();

  await supabase.auth.signOut();
  redirect("/");
}
