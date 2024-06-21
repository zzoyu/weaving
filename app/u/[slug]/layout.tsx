import { ButtonHome } from "./components/button-home";
import ButtonShare from "./components/button-share";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <div className="w-full flex justify-between p-3">
        <ButtonHome />
        <ButtonShare
          shareData={{
            title: "My Profile",
            text: "Check out my profile on this site!",
          }}
        />
      </div>
      {children}
    </div>
  );
}
