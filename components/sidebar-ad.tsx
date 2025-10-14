"use client";

type Props = {
  position?: "left" | "right";
  adClient?: string;
  adSlot?: string;
};

export default function SidebarAd({
  position = "left",
  adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID,
  adSlot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID,
}: Props) {
  return (
    <div
      className={`px-2 fixed top-14 ${
        position === "left" ? "left-0" : "right-0"
      } z-10 md:w-40 h-full hidden md:block pb-10`}
      aria-hidden
    >
      <ins
        className="adsbygoogle justify-center my-2 w-full h-full block"
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
