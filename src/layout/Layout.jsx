
import React, { useState } from "react";

import Sidebar from './../layouts/Sidebar';
import Navbar from './../layouts/Navbar';

export default function Layout({ children }) {
  const [locale, setLocale] = useState("en"); // en or ar
  const [darkMode, setDarkMode] = useState(false);

  // ✨ تغيير اللغة
  const toggleLang = () => {
    setLocale(locale === "en" ? "ar" : "en");
  };

  // ✨ تغيير الثيم
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar locale={locale} />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Topbar */}
        <Navbar
          locale={locale}
          toggleLang={toggleLang}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
import { useState } from "react";
import { FaTrash, FaEye, FaEdit } from "react-icons/fa";

const usersData = [
  {
    id: 1,
    name: "Mohamed Ahmed",
    email: "mohamedahmed@gmail.com",
    phone: "01065954581",
    avatar: "/avatar.png",
  },
  {
    id: 2,
    name: "Mohamed Ahmed",
    email: "mohamedahmed@gmail.com",
    phone: "01065954581",
    avatar: "/avatar.png",
  },
  {
    id: 3,
    name: "Mohamed Ahmed",
    email: "mohamedahmed@gmail.com",
    phone: "01065954581",
    avatar: "/avatar.png",
  },
];

export default function Users() {
  const [users, setUsers] = useState(usersData);
  const [selected, setSelected] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);

  const toggleSelectAll = () => {
    if (selected.length === users.length) {
      setSelected([]);
    } else {
      setSelected(users.map((u) => u.id));
    }
  };

  const toggleSelect = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((s) => s !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const deleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
    setSelected(selected.filter((s) => s !== id));
  };

  const deleteAll = () => {
    setUsers(users.filter((u) => !selected.includes(u.id)));
    setSelected([]);
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
    
      <h1 className="text-xl font-bold flex items-center gap-2 mb-6 text-gray-800 dark:text-gray-100">
        <span className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full">👤</span>
        USER
      </h1>

    
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Search.."
          className="border px-3 py-2 rounded-md w-64 dark:bg-gray-800 dark:text-white"
        />
        <button
          onClick={() => setFilterOpen(true)}
          className="border px-4 py-2 text-gray-600 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Filter
        </button>
      </div>

  
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-gray-600 dark:text-gray-300">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800 text-left text-sm">
              <th className="p-2">
                <input
                  type="checkbox"
                  checked={selected.length === users.length}
                  onChange={toggleSelectAll}
                />
              </th>
              <th className="p-2 text-black dark:text-white">Name</th>
              <th className="p-2 text-black dark:text-white">Email</th>
              <th className="p-2 text-black dark:text-white">Phone</th>
              <th className="p-2 text-black dark:text-white">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-t hover:bg-gray-50 dark:hover:bg-gray-700 text-sm"
              >
                <td className="p-2">
                  <input
                    type="checkbox"
                    checked={selected.includes(user.id)}
                    onChange={() => toggleSelect(user.id)}
                  />
                </td>
                <td className="p-2 flex items-center gap-2">
                  <img
                    src={user.avatar}
                    alt="avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  {user.name}
                </td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">{user.phone}</td>
                <td className="p-2 flex gap-3">
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash size={16} />
                  </button>
                  <button className="text-gray-600 dark:text-gray-300 hover:text-blue-600">
                    <FaEdit size={16} />
                  </button>
                  <button className="text-gray-600 dark:text-gray-300 hover:text-green-600">
                    <FaEye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      {selected.length > 0 && (
        <button
          onClick={deleteAll}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
        >
          Delete all
        </button>
      )}


      <div className="flex items-center justify-between mt-6 text-sm text-gray-600 dark:text-gray-300">
        <span>
          Rows per page{" "}
          <select className="border rounded-md px-2 py-1 dark:bg-gray-800 dark:text-white">
            <option>5</option>
            <option>10</option>
            <option>18</option>
          </select>
        </span>
        <div className="flex items-center gap-2">
          <button className="border px-2 py-1 rounded-md">← Prev</button>
          <button className="border px-3 py-1 rounded-md bg-[#04526A] text-white">
            1
          </button>
          <button className="border px-3 py-1 rounded-md">2</button>
          <button className="border px-3 py-1 rounded-md">3</button>
          <button className="border px-3 py-1 rounded-md">4</button>
          <button className="border px-3 py-1 rounded-md">5</button>
          <button className="border px-2 py-1 rounded-md bg-[#04526A] text-white">
            Next →
          </button>
        </div>
      </div>

  
      {filterOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
              Filter Options
            </h2>
            <input
              type="text"
              placeholder="Search by name..."
              className="w-full border px-3 py-2 rounded-md mb-4 dark:bg-gray-800 dark:text-white"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setFilterOpen(false)}
                className="px-4 py-2 border rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={() => setFilterOpen(false)}
                className="px-4 py-2 bg-[#04526A] text-white rounded-md"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
