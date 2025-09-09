
import React, { useEffect, useState } from "react";
import MainLayout from "../../../layouts/mainLayout";
import { motion } from "framer-motion";

const branches = [
  {
    id: 1,
    name: "Hurghada Branch – Shipping Company",
    desc: "Serving the area with a team of 15 employees specialized in handling, distribution, and customer service.",
    logo: "/Hurghada.jpg",
  },
  {
    id: 2,
    name: "Aswan Branch – Shipping Company",
    desc: "Serving the area with a team of 20 employees specialized in handling, distribution.",
    logo: "/aswan.jpg",
  },
  {
    id: 3,
    name: "Qena Branch – Shipping Company",
    desc: "Serving the area with a team of 12 employees specialized in handling, customer service.",
    logo: "/Qena.jpg",
  },
  {
    id: 4,
    name: "Beni Suef Branch – Shipping Company",
    desc: "Serving the area with a team of 40 employees specialized in distribution, and customer service.",
    logo: "/Beni-suef.jpg",
  },
];

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);

  useEffect(() => {
 
    setShowModal(true);
  }, []);

  const handleSelectBranch = (branch) => {
    setSelectedBranch(branch);
    setShowModal(false);
  };

  return (
    <MainLayout>
  
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Revenue
          </h2>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            $12,450
          </p>
        </div>

       
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Orders
          </h2>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            320
          </p>
        </div>

  
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Customers
          </h2>
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            1,240
          </p>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div
            className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-6xl shadow-lg
                       max-h-screen overflow-y-auto"
          >
            <h2 className="text-lg font-bold mb-6 text-gray-800 dark:text-gray-200 text-center">
              Select a Branch
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {branches.map((branch, index) => (
                <motion.div
                  key={branch.id}
                  onClick={() => handleSelectBranch(branch)}
                  className="cursor-pointer bg-gray-50 dark:bg-gray-700 rounded-xl shadow hover:shadow-lg transition 
                             p-4 flex flex-col items-center text-center w-full"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <img
                    src={branch.logo}
                    alt={branch.name}
                    className="w-24 h-24 object-cover rounded-full mb-4"
                  />
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                    {branch.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    {branch.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
