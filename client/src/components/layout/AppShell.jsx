import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const AppShell = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[280px_1fr]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="relative flex min-h-screen flex-col px-4 pb-6 pt-4 sm:px-6 lg:px-8">
        <Topbar onMenuClick={() => setIsSidebarOpen((current) => !current)} />
        <main className="mt-6 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppShell;
