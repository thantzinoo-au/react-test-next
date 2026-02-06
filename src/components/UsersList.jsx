import { useState, useEffect, useRef } from "react";
import User from "./User";

export default function UsersList() {
  const [user, setUser] = useState([]);

  const username = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const firstname = useRef(null);
  const lastname = useRef(null);

  const refreshUsersList = async () => {
    const updatedResult = await fetch("http://localhost:3000/api/user");
    const updatedData = await updatedResult.json();
    setUser(updatedData);
  };

  const resetUserInputs = () => {
    username.current.value = "";
    email.current.value = "";
    password.current.value = "";
    firstname.current.value = "";
    lastname.current.value = "";
  };

  const addUser = async () => {
    if (
      !username.current.value ||
      !email.current.value ||
      !password.current.value ||
      !firstname.current.value ||
      !lastname.current.value
    ) {
      return alert("All fields are required!");
    }
    const tmpUser = {
      username: username.current.value,
      email: email.current.value,
      password: password.current.value,
      firstname: firstname.current.value,
      lastname: lastname.current.value,
    };
    const result = await fetch("http://localhost:3000/api/user", {
      method: "POST",
      body: JSON.stringify(tmpUser),
    });
    const data = await result.json();
    if (result.ok) {
      resetUserInputs();
      await refreshUsersList();
    } else {
      alert(data.message || "Failed to add user");
    }
  };

  async function deleteUser(user_id) {
    const result = await fetch(`http://localhost:3000/api/user/${user_id}`, {
      method: "DELETE",
    });
    const data = await result.json();
    console.log(data);
    await refreshUsersList();
  }

  async function editUser(user_id, tmpUser) {
    const result = await fetch(`http://localhost:3000/api/user/${user_id}`, {
      method: "PATCH",
      body: JSON.stringify(tmpUser),
    });
    const data = await result.json();
    console.log(data);
    await refreshUsersList();
  }

  useEffect(() => {
    async function fetchData() {
      const result = await fetch("http://localhost:3000/api/user");
      const data = await result.json();
      setUser(data);
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      {/* Add User Form */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            User Management
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Username
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter username"
                type="text"
                ref={username}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter email"
                type="email"
                ref={email}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter password"
                type="password"
                ref={password}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                First Name
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter first name"
                type="text"
                ref={firstname}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Last Name
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter last name"
                type="text"
                ref={lastname}
              />
            </div>
          </div>

          <button
            className="w-full md:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold px-8 py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            onClick={addUser}
          >
            Add User
          </button>
        </div>

        {/* Users Grid */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            Users List
            <span className="text-lg font-normal text-gray-500">
              ({user.length} {user.length === 1 ? "user" : "users"})
            </span>
          </h2>
        </div>

        {user.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No users yet
            </h3>
            <p className="text-gray-500">Add your first user to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {user.map((u) => (
              <User
                key={u._id}
                user={u}
                onDelete={deleteUser}
                onEdit={editUser}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
