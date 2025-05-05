export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-grow">{children}</div>
    </div>
  );
}
