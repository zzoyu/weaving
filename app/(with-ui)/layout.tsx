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
      <div className="w-full h-full overflow-y-auto">
        <div className="px-2 fixed top-14 left-0  z-10 md:w-40 h-full hidden md:block pb-10">
          <ins
            className="adsbygoogle justify-center my-2"
            data-ad-client="ca-pub-8566989289200896"
            data-ad-slot="5446812182"
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
        </div>
        {children}
      </div>
      {userId ? navigation : <NavigationSignOut />}
    </div>
  );
}
