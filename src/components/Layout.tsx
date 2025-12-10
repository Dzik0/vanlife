import { Outlet } from "react-router";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
