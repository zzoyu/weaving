import SidebarAd from "@/components/ads/sidebar-ad";
import { createClient } from "@/utils/supabase/server";
import { NavigationSignOut } from "./@navigation/components/navigation";
import HeaderAd from "./components/header-ad";
import ScrollContainer from "./components/scroll-container";

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
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const userId = data?.user?.id;
  return (
    <div className="layout flex flex-col !h-full min-h-full max-h-full pt-14 relative">
      {header}
      <ScrollContainer>
        <HeaderAd />
        {children}
        <div className="px-2 fixed top-14 left-0  z-10 lg:w-40 h-full hidden lg:block pb-10 overflow-y-clip">
          {/* Left ad (desktop only) */}
          <SidebarAd position="left" />

          {/* Right ad (desktop only) */}
          <SidebarAd position="right" />
        </div>
      </ScrollContainer>
      {userId ? navigation : <NavigationSignOut />}
    </div>
  );
}
