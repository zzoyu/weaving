"use client";

import { useToast } from "@/hooks/use-toast";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function ButtonLogout() {
  const { toast } = useToast();
  const router = useRouter();
  function handleLogout() {
    const client = createClient();
    client.auth.signOut().then(() => {
      toast({
        title: "로그아웃",
        description: "로그아웃 되었습니다.",
      });
      router.replace("/");
    });
  }

  return (
    <button className="w-full px-4 py-2" onClick={handleLogout}>
      로그아웃
    </button>
  );
}
