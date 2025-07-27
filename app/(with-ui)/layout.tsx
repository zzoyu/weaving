import { createClient } from "@/utils/supabase/server";
import { NavigationSignOut } from "./@navigation/components/navigation";

export default async function UILayout({
  children,
  header,
  navigation,
  params,
}: Readonly<{
  children: React.ReactNode;
  header: React.ReactNode;
  navigation: React.ReactNode;
  params: { slug: string; id: string };
}>) {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  const userId = data?.user?.id;
  return (
    <div className="flex flex-col h-full pt-14">
      {header}
      <div className="w-full h-full overflow-y-auto">{children}</div>
      {userId ? navigation : <NavigationSignOut />}
    </div>
  );
}
