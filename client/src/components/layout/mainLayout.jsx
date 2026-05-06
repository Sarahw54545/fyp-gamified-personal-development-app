import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Navbar from "./navbar";
import { Toaster } from "sonner";

function MainLayout({ children }) {
  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen bg-slate-950 text-white">

        <Navbar />

        <header className="sticky top-0 h-20 flex items-center">
          <SidebarTrigger />
        </header>

        <main className="flex-1 p-8">
          {children}
        </main>


        <Toaster position="bottom-right" expand={true} richColors closeButton />


      </div>
    </SidebarProvider>
  );
}

export default MainLayout;