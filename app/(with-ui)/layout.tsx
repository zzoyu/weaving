export default function UILayout({
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
  return (
    <div className="flex flex-col h-full pt-14">
      {header}
      <div className="w-full h-full overflow-y-auto">{children}</div>
      {navigation}
    </div>
  );
}
