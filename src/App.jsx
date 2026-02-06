import { Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import "./App.css";
import ItemsList from "./components/ItemsList";
import UsersList from "./components/UsersList";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Profile from "./components/Profile";
import RequireAuth from "./middleware/RequireAuth";
import { useUser } from "./contexts/UserProvider";

function App() {
  const location = useLocation();
  const { user } = useUser();

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
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

            {/* Auth Links */}
            <div className="flex items-center gap-4">
              {user.isLoggedIn ? (
                <>
                  <Link
                    to="/profile"
                    className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                      location.pathname === "/profile"
                        ? "bg-purple-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/logout"
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg transition-all shadow-md"
                  >
                    Logout
                  </Link>
                </>
              ) : (
                <Link
                  to="/login"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-lg transition-all shadow-md"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Navigate to="/user" />}></Route>
        <Route path="/item" element={<ItemsList />}></Route>
        <Route path="/user" element={<UsersList />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/logout"
          element={
            <RequireAuth>
              <Logout />
            </RequireAuth>
          }
        ></Route>
      </Routes>
    </div>
  );
}
export default App;
