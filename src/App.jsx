import { Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import "./App.css";
import ItemsList from "./components/ItemsList";
import UsersList from "./components/UsersList";

function App() {
  const location = useLocation();

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-800 mr-8">
              Management System
            </h1>
            <Link
              to="/user"
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                location.pathname === "/user"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Users
            </Link>
            <Link
              to="/item"
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                location.pathname === "/item"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Items
            </Link>
          </div>
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Navigate to="/user" />}></Route>
        <Route path="/item" element={<ItemsList />}></Route>
        <Route path="/user" element={<UsersList />}></Route>
      </Routes>
    </div>
  );
}
export default App;
