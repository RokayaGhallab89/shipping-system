import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";

export default function MainLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-4 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
