import MainMenu from "./components/main-menu";

export default async function Home() {
  return (
    <main className="h-full flex flex-col items-center">
      <div className="h-1/2 flex flex-col items-center justify-center gap-2">
        <h1>weaving</h1>
        <p>너와 나의 연결 고리, 위빙</p>
      </div>

      <MainMenu />
    </main>
  );
}
