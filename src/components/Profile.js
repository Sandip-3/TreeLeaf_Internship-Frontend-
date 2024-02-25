import React, { useState } from "react";
import { useRecordsContext } from "../context/RecordProvider";
import { FiEdit } from "react-icons/fi";
import { IoMdTrash } from "react-icons/io";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { records, deleteRecord, editRecord } = useRecordsContext();
  const [editIndex, setEditIndex] = useState(-1);
  const [editedRecord, setEditedRecord] = useState({});
  const [sortDirection, setSortDirection] = useState("asc");
  const navigate = useNavigate();

  const handleDelete = (index) => {
    deleteRecord(index);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedRecord(records[index]);
  };

  const handleChange = (e, field) => {
    const { value } = e.target;
    setEditedRecord((prevRecord) => ({
      ...prevRecord,
      [field]: value,
      address: {
        ...prevRecord.address,
        [field]: value,
      },
    }));
  };

  const handleSave = (index) => {
    editRecord(index, editedRecord);
    setEditIndex(-1);
    setEditedRecord({});
  };

  const useNavigation = () => {
    navigate("/");
  };

  const sortByname = () => {
    const sortedRecords = [...records].sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) {
        return sortDirection === "asc" ? -1 : 1;
      }
      if (nameA > nameB) {
        return sortDirection === "asc" ? 1 : -1;
      }
      return 0;
    });
    return sortedRecords;
  };

  const sortedRecords = sortByname();

  return (
    <>
      <ul className="divide-y divide-gray-200">
        <h1 className="font-bold text-4xl text-center">Profile Page</h1>
        {sortedRecords.map((record, index) => (
          <li
            key={index}
            className={index % 2 === 0 ? "bg-white" : "bg-gray-50 p-4"}
          >
            {editIndex === index ? (
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  name="name"
                  value={editedRecord.name}
                  onChange={(e) => handleChange(e, "name")}
                  className="border rounded-md px-2 py-1 focus:outline-none focus:border-blue-500 flex-grow"
                />
                <input
                  type="email"
                  name="email"
                  value={editedRecord.email}
                  onChange={(e) => handleChange(e, "email")}
                  className="border rounded-md px-2 py-1 focus:outline-none focus:border-blue-500 flex-grow"
                />
                <input
                  type="text"
                  name="phoneNumber"
                  value={editedRecord.phoneNumber}
                  onChange={(e) => handleChange(e, "phoneNumber")}
                  className="border rounded-md px-2 py-1 focus:outline-none focus:border-blue-500 flex-grow"
                />
                <input
                  type="text"
                  name="city"
                  value={editedRecord.address.city || ""}
                  onChange={(e) => handleChange(e, "city")}
                  className="border rounded-md px-2 py-1 focus:outline-none focus:border-blue-500 flex-grow"
                />
                <input
                  type="text"
                  name="district"
                  value={editedRecord.address.district || ""}
                  onChange={(e) => handleChange(e, "district")}
                  className="border rounded-md px-2 py-1 focus:outline-none focus:border-blue-500 flex-grow"
                />
                <input
                  type="text"
                  name="province"
                  value={editedRecord.address.province || ""}
                  onChange={(e) => handleChange(e, "province")}
                  className="border rounded-md px-2 py-1 focus:outline-none focus:border-blue-500 flex-grow"
                />
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleSave(index)}
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="m-4">
                <div className="space-y-2">
                  <div className="font-bold">Name: {record.name}</div>
                  <div className="font-bold">Email: {record.email}</div>
                  <div className="font-bold">
                    Phone Number: {record.phoneNumber}
                  </div>
                  <div className="font-bold">City: {record.address.city}</div>
                  <div className="font-bold">
                    District: {record.address.district}
                  </div>
                  <div className="font-bold">
                    Province: {record.address.province}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleDelete(index)}
                    >
                      <IoMdTrash size={20} />
                    </button>
                    <button
                      className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleEdit(index)}
                    >
                      <FiEdit size={20} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="max-w-md mx-auto mt-2 flex justify-center">
        <div>
          <button
            className="flex items-center m-2 bg-gray-500 rounded-md text-white  py-1 px-3"
            onClick={useNavigation}
          >
            Go Back <FaLongArrowAltLeft className="ml-2" size={20} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
