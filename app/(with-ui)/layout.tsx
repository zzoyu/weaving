import SidebarAd from "@/components/ads/sidebar-ad";
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
    <div className="layout flex flex-col h-full pt-14">
      {header}
      <div className="w-full h-full overflow-y-auto">
        <div className="px-2 fixed top-14 left-0  z-10 lg:w-40 h-full hidden lg:block pb-10">
          {/* Left ad (desktop only) */}
          <SidebarAd position="left" />

          {/* Right ad (desktop only) */}
          <SidebarAd position="right" />
        </div>
        {children}
      </div>
      {userId ? navigation : <NavigationSignOut />}
    </div>
  );
}
