import { useState } from "react";
import { Trash2, Eye, Edit, Plus, Mail, Phone, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import MainLayout from '../../../layouts/mainLayout';
import { Filter } from "lucide-react";
const initialBranches = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: "Aswan Branch",
  code: "BR-" + (2000 + i),
  location: "Aswan",
  email: "aswanbranch@gmail.com",
  phone: "01065954581",
  active: i % 2 === 0 ? "Active" : "Inactive",
  avatar: "./ship.jpg",
}));

export default function Branches() {
  const { t } = useTranslation();
  const [branches, setBranches] = useState(initialBranches);
  const [selected, setSelected] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newBranch, setNewBranch] = useState({
    name: "",
    code: "",
    location: "",
    email: "",
    phone: "",
    active: "Active",
    avatar: "./ship.jpg",
  });

  const [editBranch, setEditBranch] = useState(null);

  const totalPages = Math.ceil(branches.length / rowsPerPage);
  const startIdx = (currentPage - 1) * rowsPerPage;
  const paginatedBranches = branches.slice(startIdx, startIdx + rowsPerPage);

  const toggleSelectAll = () => {
    if (selected.length === paginatedBranches.length) setSelected([]);
    else setSelected(paginatedBranches.map((b) => b.id));
  };

  const toggleSelect = (id) => {
    if (selected.includes(id)) setSelected(selected.filter((s) => s !== id));
    else setSelected([...selected, id]);
  };

  const deleteBranch = (id) => {
    setBranches(branches.filter((b) => b.id !== id));
    setSelected(selected.filter((s) => s !== id));
  };

  const deleteAll = () => {
    setBranches(branches.filter((b) => !selected.includes(b.id)));
    setSelected([]);
  };

  const addBranch = () => {
    if (!newBranch.name || !newBranch.code) return;
    setBranches([{ ...newBranch, id: branches.length + 1 }, ...branches]);
    setNewBranch({ name: "", code: "", location: "", email: "", phone: "", active: "Active", avatar: "./ship.jpg" });
    setShowAddModal(false);
  };

  const updateBranch = () => {
    setBranches(branches.map(b => b.id === editBranch.id ? editBranch : b));
    setEditBranch(null);
  };

  return (
    <MainLayout>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h1 className="text-xl font-bold flex items-center gap-2 mb-4 text-gray-800 dark:text-gray-200">
          🏢 {t("branches.title", "Branches")}
        </h1>

 
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-4">
          <input
            type="text"
            placeholder={t("branches.search", "Search..")}
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
            <Plus size={16} /> {t("branches.add", "Add Branch")}
          </button>
        </div>

       
        <div className="hidden sm:block overflow-x-auto w-full">
          <table className="w-full border-collapse text-gray-600 dark:text-gray-200">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 text-left text-sm">
                <th className="p-2 w-10">
                  <input
                    type="checkbox"
                    checked={selected.length === paginatedBranches.length && paginatedBranches.length > 0}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="p-2">Name</th>
                <th className="p-2">Code</th>
                <th className="p-2">Location</th>
                <th className="p-2">Email</th>
                <th className="p-2">Phone</th>
                <th className="p-2">Active</th>
                <th className="p-2 w-32">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedBranches.map(branch => (
                <tr key={branch.id} className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-sm">
                  <td className="p-2">
                    <input type="checkbox" checked={selected.includes(branch.id)} onChange={() => toggleSelect(branch.id)} />
                  </td>
                  <td className="p-2 flex items-center gap-2 min-w-0">
                    <img src={branch.avatar} alt="avatar" className="w-8 h-8 rounded-full flex-shrink-0" />
                    <span className="truncate">{branch.name}</span>
                  </td>
                  <td className="p-2 truncate">{branch.code}</td>
                  <td className="p-2 truncate">{branch.location}</td>
                  <td className="p-2 truncate">{branch.email}</td>
                  <td className="p-2 truncate">{branch.phone}</td>
                  <td className="p-2">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={branch.active === "Active"}
                        onChange={(e) =>
                          setBranches(
                            branches.map((b) =>
                              b.id === branch.id
                                ? { ...b, active: e.target.checked ? "Active" : "Inactive" }
                                : b
                            )
                          )
                        }
                      />
                      <div className="relative w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-400 transition-colors">
                        <div className="absolute top-[2px] left-[2px] w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 peer-checked:translate-x-full"></div>
                      </div>
                    </label>
                  </td>
                  <td className="p-2 flex gap-2">
                    <button onClick={() => deleteBranch(branch.id)} className="text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
                    <button onClick={() => setEditBranch(branch)} className="text-gray-600 dark:text-gray-200 hover:text-blue-600"><Edit size={18} /></button>
                    <button className="text-gray-600 dark:text-gray-200 hover:text-green-600"><Eye size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

 
        <div className="sm:hidden flex flex-col gap-3">
          {paginatedBranches.map(branch => (
            <div key={branch.id} className="border rounded-lg p-3 shadow-sm dark:border-gray-700 dark:bg-gray-700">
              <div className="flex items-center gap-3 mb-2">
                <img src={branch.avatar} alt="avatar" className="w-10 h-10 rounded-full" />
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200">{branch.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{branch.code}</p>
                </div>
              </div>
              <p className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300"><MapPin size={14} /> {branch.location}</p>
              <p className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300"><Mail size={14} /> {branch.email}</p>
              <p className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300"><Phone size={14} /> {branch.phone}</p>

          
              <div className="mt-2">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={branch.active === "Active"}
                    onChange={(e) =>
                      setBranches(
                        branches.map((b) =>
                          b.id === branch.id
                            ? { ...b, active: e.target.checked ? "Active" : "Inactive" }
                            : b
                        )
                      )
                    }
                  />
                  <div className="relative w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-400 transition-colors">
                    <div className="absolute top-[2px] left-[2px] w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 peer-checked:translate-x-full"></div>
                  </div>
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">{branch.active}</span>
                </label>
              </div>

       
              <div className="flex gap-3 mt-3">
                <button onClick={() => setEditBranch(branch)} className="flex-1 flex items-center justify-center gap-1 text-blue-500 border border-blue-500 rounded-md py-1 hover:bg-blue-50 dark:hover:bg-gray-600">
                  <Edit size={16} /> Edit
                </button>
                <button onClick={() => deleteBranch(branch.id)} className="flex-1 flex items-center justify-center gap-1 text-red-500 border border-red-500 rounded-md py-1 hover:bg-red-50 dark:hover:bg-gray-600">
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>


     
        {selected.length > 0 && (
          <button onClick={deleteAll} className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md">
            {t("branches.deleteAll", "Delete all")}
          </button>
        )}


        <div className="flex flex-col md:flex-row items-center justify-between mt-4 text-sm gap-3">
          <span className="text-gray-600 dark:text-gray-300">
            {t("branches.rowsPerPage", "Rows per page")}{" "}
            <select
              className="border dark:border-gray-700 rounded-md px-2 py-1 dark:bg-gray-700 dark:text-gray-200"
              value={rowsPerPage}
              onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={18}>18</option>
            </select>
          </span>
        </div>
      </div>

  
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-md w-96">
            <h2 className="text-lg font-bold mb-4">{t("branches.add", "Add Branch")}</h2>
            <input type="text" placeholder="Name" className="w-full mb-2 p-2 border rounded-md dark:bg-gray-700 dark:text-gray-200" value={newBranch.name} onChange={(e) => setNewBranch({ ...newBranch, name: e.target.value })} />
            <input type="text" placeholder="Code" className="w-full mb-2 p-2 border rounded-md dark:bg-gray-700 dark:text-gray-200" value={newBranch.code} onChange={(e) => setNewBranch({ ...newBranch, code: e.target.value })} />
            <input type="text" placeholder="Location" className="w-full mb-2 p-2 border rounded-md dark:bg-gray-700 dark:text-gray-200" value={newBranch.location} onChange={(e) => setNewBranch({ ...newBranch, location: e.target.value })} />
            <input type="email" placeholder="Email" className="w-full mb-2 p-2 border rounded-md dark:bg-gray-700 dark:text-gray-200" value={newBranch.email} onChange={(e) => setNewBranch({ ...newBranch, email: e.target.value })} />
            <input type="text" placeholder="Phone" className="w-full mb-2 p-2 border rounded-md dark:bg-gray-700 dark:text-gray-200" value={newBranch.phone} onChange={(e) => setNewBranch({ ...newBranch, phone: e.target.value })} />
            <select className="w-full mb-4 p-2 border rounded-md dark:bg-gray-700 dark:text-gray-200" value={newBranch.active} onChange={(e) => setNewBranch({ ...newBranch, active: e.target.value })}>
              <option>Active</option>
              <option>Inactive</option>
            </select>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2 rounded-md border dark:border-gray-700">{t("branches.cancel", "Cancel")}</button>
              <button onClick={addBranch} className="px-4 py-2 rounded-md bg-[#04526A] text-white">{t("branches.add", "Add")}</button>
            </div>
          </div>
        </div>
      )}

  
      {editBranch && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-md w-96">
            <h2 className="text-lg font-bold mb-4">{t("branches.edit", "Edit Branch")}</h2>
            <input type="text" placeholder="Name" className="w-full mb-2 p-2 border rounded-md dark:bg-gray-700 dark:text-gray-200" value={editBranch.name} onChange={(e) => setEditBranch({ ...editBranch, name: e.target.value })} />
            <input type="text" placeholder="Code" className="w-full mb-2 p-2 border rounded-md dark:bg-gray-700 dark:text-gray-200" value={editBranch.code} onChange={(e) => setEditBranch({ ...editBranch, code: e.target.value })} />
            <input type="text" placeholder="Location" className="w-full mb-2 p-2 border rounded-md dark:bg-gray-700 dark:text-gray-200" value={editBranch.location} onChange={(e) => setEditBranch({ ...editBranch, location: e.target.value })} />
            <input type="email" placeholder="Email" className="w-full mb-2 p-2 border rounded-md dark:bg-gray-700 dark:text-gray-200" value={editBranch.email} onChange={(e) => setEditBranch({ ...editBranch, email: e.target.value })} />
            <input type="text" placeholder="Phone" className="w-full mb-2 p-2 border rounded-md dark:bg-gray-700 dark:text-gray-200" value={editBranch.phone} onChange={(e) => setEditBranch({ ...editBranch, phone: e.target.value })} />
            <select className="w-full mb-4 p-2 border rounded-md dark:bg-gray-700 dark:text-gray-200" value={editBranch.active} onChange={(e) => setEditBranch({ ...editBranch, active: e.target.value })}>
              <option>Active</option>
              <option>Inactive</option>
            </select>
            <div className="flex justify-end gap-2">
              <button onClick={() => setEditBranch(null)} className="px-4 py-2 rounded-md border dark:border-gray-700">{t("branches.cancel", "Cancel")}</button>
              <button onClick={updateBranch} className="px-4 py-2 rounded-md bg-blue-500 text-white">{t("branches.update", "Update")}</button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
