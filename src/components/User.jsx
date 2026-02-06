import { useState, useRef } from "react";

export default function User({ user, onDelete, onEdit }) {
  const { username, email, firstname, lastname, status } = user;
  const [isEdit, setIsEdit] = useState(false);
  const usernameEdit = useRef(null);
  const emailEdit = useRef(null);
  const firstnameEdit = useRef(null);
  const lastnameEdit = useRef(null);

  const deleteUser = async () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${firstname} ${lastname}?`,
      )
    ) {
      await onDelete(user._id);
    }
  };

  const editUser = async () => {
    setIsEdit(!isEdit);
    if (isEdit) {
      const tmpUser = {
        username: usernameEdit.current.value,
        email: emailEdit.current.value,
        firstname: firstnameEdit.current.value,
        lastname: lastnameEdit.current.value,
      };
      await onEdit(user._id, tmpUser);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-indigo-200 transform hover:-translate-y-1">
      {isEdit ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Username
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
              placeholder="Enter username"
              type="text"
              ref={usernameEdit}
              defaultValue={username}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
              placeholder="Enter email"
              type="email"
              ref={emailEdit}
              defaultValue={email}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              First Name
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
              placeholder="Enter first name"
              type="text"
              ref={firstnameEdit}
              defaultValue={firstname}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Last Name
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
              placeholder="Enter last name"
              type="text"
              ref={lastnameEdit}
              defaultValue={lastname}
            />
          </div>
        </div>
      ) : (
        <div className="space-y-3 mb-4">
          <p className="text-xs text-gray-400 font-mono">{username}</p>
          <h3 className="text-xl font-bold text-gray-800 truncate">
            {firstname} {lastname}
          </h3>
          <p className="text-gray-600">{email}</p>
          <div className="flex items-center gap-2">
            <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
              {status}
            </span>
          </div>
        </div>
      )}

      <div className="flex gap-2 mt-4">
        <button
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
          onClick={editUser}
        >
          {isEdit ? "Save" : "Edit"}
        </button>
        <button
          className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
          onClick={deleteUser}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
