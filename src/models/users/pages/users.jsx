import { useState } from "react";
import { Trash2, Eye, Edit, Plus, Mail, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import MainLayout from './../../../layouts/mainLayout';
import { Filter } from "lucide-react";
const initialUsers = Array.from({ length: 40 }, (_, i) => ({
  id: i + 1,
  name: "Mohamed Ahmed",
  email: "mohamedahmed@gmail.com",
  phone: "01065954581",
  avatar: "./ship.jpg",
}));

export default function Users() {
  const { t } = useTranslation();
  const [users, setUsers] = useState(initialUsers);
  const [selected, setSelected] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(18);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", phone: "", avatar: "./ship.jpg" });

  const [editUser, setEditUser] = useState(null);

  const totalPages = Math.ceil(users.length / rowsPerPage);
  const startIdx = (currentPage - 1) * rowsPerPage;
  const paginatedUsers = users.slice(startIdx, startIdx + rowsPerPage);

  const toggleSelectAll = () => {
    if (selected.length === paginatedUsers.length) setSelected([]);
    else setSelected(paginatedUsers.map((u) => u.id));
  };

  const toggleSelect = (id) => {
    if (selected.includes(id)) setSelected(selected.filter((s) => s !== id));
    else setSelected([...selected, id]);
  };

  const deleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
    setSelected(selected.filter((s) => s !== id));
  };

  const deleteAll = () => {
    setUsers(users.filter((u) => !selected.includes(u.id)));
    setSelected([]);
  };

  const addUser = () => {
    if (!newUser.name || !newUser.email) return;
    setUsers([{ ...newUser, id: users.length + 1 }, ...users]);
    setNewUser({ name: "", email: "", phone: "", avatar: "/avatar.png" });
    setShowAddModal(false);
  };

  const updateUser = () => {
    setUsers(users.map(u => u.id === editUser.id ? editUser : u));
    setEditUser(null);
  };

  return (
    <MainLayout>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h1 className="text-xl font-bold flex items-center gap-2 mb-4 text-gray-800 dark:text-gray-200">
          <span className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full">👤</span>
          {t("users.title", "USER")}
        </h1>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-4">
          <input
            type="text"
            placeholder={t("users.search", "Search..")}
            className="border dark:border-gray-700 px-3 py-2 rounded-md w-full sm:w-64 dark:bg-gray-700 dark:text-gray-200"
          />
         <button
  className="flex items-center gap-2 border px-4 py-2 text-gray-600 dark:text-gray-200 
             dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600"
>
  <Filter size={18} />
  {t("users.filter", "Filter")}
</button>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1 bg-[#04526A] text-white px-4 py-2 rounded-md hover:bg-[#04526A]"
          >
            <Plus size={16} /> {t("users.add", "Add User")}
          </button>
        </div>

        <div className="hidden sm:block overflow-x-auto w-full">
          <table className="w-full border-collapse text-gray-600 dark:text-gray-200">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 text-left text-sm">
                <th className="p-2 w-10">
                  <input
                    type="checkbox"
                    checked={selected.length === paginatedUsers.length && paginatedUsers.length > 0}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="p-2">Name</th>
                <th className="p-2 hidden sm:table-cell">Email</th>
                <th className="p-2 hidden md:table-cell">Phone</th>
                <th className="p-2 w-32">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map(user => (
                <tr key={user.id} className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-sm">
                  <td className="p-2">
                    <input type="checkbox" checked={selected.includes(user.id)} onChange={() => toggleSelect(user.id)} />
                  </td>
                  <td className="p-2 flex items-center gap-2 min-w-0">
                    <img src={user.avatar} alt="avatar" className="w-8 h-8 rounded-full flex-shrink-0" />
                    <span className="truncate">{user.name}</span>
                  </td>
                  <td className="p-2 hidden sm:table-cell truncate">{user.email}</td>
                  <td className="p-2 hidden md:table-cell truncate">{user.phone}</td>
                  <td className="p-2 flex gap-2">
                    <button onClick={() => deleteUser(user.id)} className="text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
                    <button onClick={() => setEditUser(user)} className="text-gray-600 dark:text-gray-200 hover:text-blue-600"><Edit size={18} /></button>
                    <button className="text-gray-600 dark:text-gray-200 hover:text-green-600"><Eye size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

  
        <div className="sm:hidden flex flex-col gap-2">
          {paginatedUsers.map(user => (
            <div key={user.id} className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-sm border dark:border-gray-700">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <img src={user.avatar} alt="avatar" className="w-10 h-10 rounded-full" />
                  <span className="font-semibold">{user.name}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => deleteUser(user.id)} className="text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
                  <button onClick={() => setEditUser(user)} className="text-gray-600 dark:text-gray-200 hover:text-blue-600"><Edit size={18} /></button>
                  <button className="text-gray-600 dark:text-gray-200 hover:text-green-600"><Eye size={18} /></button>
                </div>
              </div>
              <div className="flex flex-col gap-1 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-1"><Mail size={14} /> <span className="truncate">{user.email}</span></div>
                <div className="flex items-center gap-1"><Phone size={14} /> <span className="truncate">{user.phone}</span></div>
              </div>
            </div>
          ))}
        </div>

   
        {selected.length > 0 && (
          <button onClick={deleteAll} className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md">
            {t("users.deleteAll", "Delete all")}
          </button>
        )}

     
        <div className="flex flex-col md:flex-row items-center justify-between mt-4 text-sm gap-3">
          <span className="text-gray-600 dark:text-gray-300">
            {t("users.rowsPerPage", "Rows per page")}{" "}
            <select
              className="border dark:border-gray-700 rounded-md px-2 py-1 dark:bg-gray-700 dark:text-gray-200"
              value={rowsPerPage}
              onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={18}>18</option>
            </select>
            {"  "}
            {startIdx + 1}-{Math.min(startIdx + rowsPerPage, users.length)} {t("users.of", "of")} {users.length} {t("users.rows", "rows")}
          </span>

          <div className="flex items-center gap-1">
            <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} className="border px-3 py-1 rounded-md disabled:opacity-50" disabled={currentPage === 1}>
              ← {t("users.prev", "Prev")}
            </button>

            {[...Array(totalPages).keys()].slice(0, 5).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page + 1)}
                className={`border px-3 py-1 rounded-md ${currentPage === page + 1 ? "bg-[#04526A] text-white" : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"}`}
              >
                {page + 1}
              </button>
            ))}

            <button onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} className="border px-3 py-1 rounded-md disabled:opacity-50" disabled={currentPage === totalPages}>
              {t("users.next", "Next")} →
            </button>
          </div>
        </div>
      </div>

   
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-md w-96">
            <h2 className="text-lg  font-bold mb-4">{t("users.add", "Add User")}</h2>
            <input type="text" placeholder={t("users.name", "Name")} className="w-full mb-2 p-2 border rounded-md dark:bg-gray-700 dark:text-gray-200" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
            <input type="email" placeholder={t("users.email", "Email")} className="w-full mb-2 p-2 border rounded-md dark:bg-gray-700 dark:text-gray-200" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
            <input type="text" placeholder={t("users.phone", "Phone")} className="w-full mb-4 p-2 border rounded-md dark:bg-gray-700 dark:text-gray-200" value={newUser.phone} onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })} />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2 rounded-md border dark:border-gray-700">{t("users.cancel", "Cancel")}</button>
              <button onClick={addUser} className="px-4 py-2 rounded-md bg-[#04526A] text-white">{t("users.add", "Add")}</button>
            </div>
          </div>
        </div>
      )}

      {editUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-md w-96">
            <h2 className="text-lg font-bold mb-4">{t("users.edit", "Edit User")}</h2>
            <input type="text" placeholder={t("users.name", "Name")} className="w-full mb-2 p-2 border rounded-md dark:bg-gray-700 dark:text-gray-200" value={editUser.name} onChange={(e) => setEditUser({ ...editUser, name: e.target.value })} />
            <input type="email" placeholder={t("users.email", "Email")} className="w-full mb-2 p-2 border rounded-md dark:bg-gray-700 dark:text-gray-200" value={editUser.email} onChange={(e) => setEditUser({ ...editUser, email: e.target.value })} />
            <input type="text" placeholder={t("users.phone", "Phone")} className="w-full mb-4 p-2 border rounded-md dark:bg-gray-700 dark:text-gray-200" value={editUser.phone} onChange={(e) => setEditUser({ ...editUser, phone: e.target.value })} />
            <div className="flex justify-end gap-2">
              <button onClick={() => setEditUser(null)} className="px-4 py-2 rounded-md border dark:border-gray-700">{t("users.cancel", "Cancel")}</button>
              <button onClick={updateUser} className="px-4 py-2 rounded-md bg-blue-500 text-white">{t("users.update", "Update")}</button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
