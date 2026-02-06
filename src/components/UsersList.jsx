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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 relative overflow-hidden">
      {/* Add User Form */}
      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        <div className="relative mb-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                Create User
              </h1>
              <p className="text-gray-500 text-sm">
                Fill in the details below to add a new member
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {/* Username Input */}
              <div className="relative">
                <input
                  className="peer w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-gray-900 placeholder-transparent hover:border-gray-400"
                  placeholder="Username"
                  type="text"
                  ref={username}
                  id="username-input"
                />
                <label
                  htmlFor="username-input"
                  className="absolute left-3 -top-2 bg-white px-1 text-xs font-medium text-gray-600 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-4 peer-placeholder-shown:bg-transparent peer-focus:-top-2 peer-focus:left-3 peer-focus:text-xs peer-focus:text-indigo-600 peer-focus:bg-white"
                >
                  Username
                </label>
              </div>

              {/* Email Input */}
              <div className="relative">
                <input
                  className="peer w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-gray-900 placeholder-transparent hover:border-gray-400"
                  placeholder="Email"
                  type="email"
                  ref={email}
                  id="email-input"
                />
                <label
                  htmlFor="email-input"
                  className="absolute left-3 -top-2 bg-white px-1 text-xs font-medium text-gray-600 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-4 peer-placeholder-shown:bg-transparent peer-focus:-top-2 peer-focus:left-3 peer-focus:text-xs peer-focus:text-indigo-600 peer-focus:bg-white"
                >
                  Email
                </label>
              </div>

              {/* Password Input */}
              <div className="relative">
                <input
                  className="peer w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-gray-900 placeholder-transparent hover:border-gray-400"
                  placeholder="Password"
                  type="password"
                  ref={password}
                  id="password-input"
                />
                <label
                  htmlFor="password-input"
                  className="absolute left-3 -top-2 bg-white px-1 text-xs font-medium text-gray-600 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-4 peer-placeholder-shown:bg-transparent peer-focus:-top-2 peer-focus:left-3 peer-focus:text-xs peer-focus:text-indigo-600 peer-focus:bg-white"
                >
                  Password
                </label>
              </div>

              {/* First Name Input */}
              <div className="relative">
                <input
                  className="peer w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-gray-900 placeholder-transparent hover:border-gray-400"
                  placeholder="First Name"
                  type="text"
                  ref={firstname}
                  id="firstname-input"
                />
                <label
                  htmlFor="firstname-input"
                  className="absolute left-3 -top-2 bg-white px-1 text-xs font-medium text-gray-600 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-4 peer-placeholder-shown:bg-transparent peer-focus:-top-2 peer-focus:left-3 peer-focus:text-xs peer-focus:text-indigo-600 peer-focus:bg-white"
                >
                  First Name
                </label>
              </div>

              {/* Last Name Input */}
              <div className="relative">
                <input
                  className="peer w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-gray-900 placeholder-transparent hover:border-gray-400"
                  placeholder="Last Name"
                  type="text"
                  ref={lastname}
                  id="lastname-input"
                />
                <label
                  htmlFor="lastname-input"
                  className="absolute left-3 -top-2 bg-white px-1 text-xs font-medium text-gray-600 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-4 peer-placeholder-shown:bg-transparent peer-focus:-top-2 peer-focus:left-3 peer-focus:text-xs peer-focus:text-indigo-600 peer-focus:bg-white"
                >
                  Last Name
                </label>
              </div>

              {/* Add User Button */}
              <div className="relative md:col-span-2 lg:col-span-1 flex items-end">
                <button
                  className="w-full px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                  onClick={addUser}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Add User
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Users Grid */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            Users List
            <span className="text-sm font-normal text-gray-500">
              ({user.length} {user.length === 1 ? "user" : "users"})
            </span>
          </h2>
        </div>

        {user.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center border border-gray-200">
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
