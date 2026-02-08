import { SidebarProvider } from "@/components/ui/sidebar";
import Navbar from "./navbar";

function MainLayout({ children }) {
  return (
    <SidebarProvider>

      <div className="flex w-full min-h-screen bg-slate-950 text-white">

        <Navbar />

        <main className="flex-1 p-8">
          {children}
        </main>

      </div>

    </SidebarProvider>
  );
}

export default MainLayout;