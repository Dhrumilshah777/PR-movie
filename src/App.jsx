import { Outlet, Link } from "react-router-dom";
import "./App.css"

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <nav className="flex  items-center px-8 py-4 bg-black/90 backdrop-blur-md fixed top-0 left-0 w-full z-50 shadow-lg">
        <h1 className="text-2xl  me-10 font-extrabold text-red-600 tracking-wide">NetMirror</h1>
        <div className="space-x-6 text-gray-300 font-medium ">
          <Link to="/" className="hover:text-white transition">Home</Link>
          <Link to="/add" className="hover:text-white transition">AddMovie</Link>
        </div>
      </nav>

      <main className="pt-24 px-6 lg:px-12">
        <Outlet />
      </main>
    </div>
  );
}
