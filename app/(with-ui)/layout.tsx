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
    <div className="layout flex flex-col !h-full min-h-full max-h-full pt-14 relative">
      {header}
      <div className="w-full h-full overflow-y-auto grow shrink">
        <div className="mx-auto max-h-20">
          <ins
            className="adsbygoogle w-full h-full block mx-auto max-w-xl max-h-20"
            data-ad-client="ca-pub-8566989289200896"
            data-ad-slot="3734400914"
            data-ad-format="auto"
            data-full-width-responsive="true"
            style={{ display: "block", height: "80px" }}
          ></ins>
        </div>
        {children}
        <div className="px-2 fixed top-14 left-0  z-10 lg:w-40 h-full hidden lg:block pb-10 overflow-y-clip">
          {/* Left ad (desktop only) */}
          <SidebarAd position="left" />

          {/* Right ad (desktop only) */}
          <SidebarAd position="right" />
        </div>
      </div>
      {userId ? navigation : <NavigationSignOut />}
    </div>
  );
}
