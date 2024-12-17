import { Header } from "./components/header";
import { Navigation } from "./components/navigation";

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-full py-10 md:py-14">
      <Header />
      <div className="w-full h-full overflow-y-auto pb-20">{children}</div>
      <Navigation />
    </div>
  );
}
