import React, { useState } from "react";
import { useRecordsContext } from "../context/RecordProvider";
import { FiEdit } from "react-icons/fi";
import { IoMdTrash } from "react-icons/io";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const Table = () => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedRecord((prevRecord) => ({
      ...prevRecord,
      [name]: value,
      address: {
        ...prevRecord.address,
        [name]: value,
      },
    }));
  };

  const handleSave = (index) => {
    editRecord(index, editedRecord);
    setEditIndex(-1);
    setEditedRecord({});
  };
    
    const useNavigation = () => {
        navigate("/profile")
    }

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
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() =>
                  setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
                }
              >
                Name
                {sortDirection === "asc" ? (
                  <span>&uarr;</span>
                ) : (
                  <span>&darr;</span>
                )}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Phone Number
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                City
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                District
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Province
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedRecords.map((record, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {editIndex === index ? (
                    <input
                      type="text"
                      name="name"
                      value={editedRecord.name}
                      onChange={handleChange}
                      className="border rounded-md px-2 py-1 focus:outline-none focus:border-blue-500"
                    />
                  ) : (
                    record.name
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {editIndex === index ? (
                    <input
                      type="email"
                      name="email"
                      value={editedRecord.email}
                      onChange={handleChange}
                      className="border rounded-md px-2 py-1 focus:outline-none focus:border-blue-500"
                    />
                  ) : (
                    record.email
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {editIndex === index ? (
                    <input
                      type="text"
                      name="phoneNumber"
                      value={editedRecord.phoneNumber}
                      onChange={handleChange}
                      className="border rounded-md px-2 py-1 focus:outline-none focus:border-blue-500"
                    />
                  ) : (
                    record.phoneNumber
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {editIndex === index ? (
                    <input
                      type="text"
                      name="city"
                      value={editedRecord.address.city || ""}
                      onChange={handleChange}
                      className="border rounded-md px-2 py-1 focus:outline-none focus:border-blue-500"
                    />
                  ) : (
                    record.address.city
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {editIndex === index ? (
                    <input
                      type="text"
                      name="district"
                      value={editedRecord.address.district || ""}
                      onChange={handleChange}
                      className="border rounded-md px-2 py-1 focus:outline-none focus:border-blue-500"
                    />
                  ) : (
                    record.address.district
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {editIndex === index ? (
                    <input
                      type="text"
                      name="province"
                      value={editedRecord.address.province || ""}
                      onChange={handleChange}
                      className="border rounded-md px-2 py-1 focus:outline-none focus:border-blue-500"
                    />
                  ) : (
                    record.address.province
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {editIndex === index ? (
                    <button
                      onClick={() => handleSave(index)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Save
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => handleDelete(index)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <IoMdTrash size={20} />
                      </button>
                      <button
                        onClick={() => handleEdit(index)}
                        className="text-indigo-600 hover:text-indigo-900 ml-2"
                      >
                        <FiEdit size={20} />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="max-w-md mx-auto mt-2 flex justify-center">
          <div>
            <button className="flex items-center m-2 bg-gray-500 rounded-md text-white  py-1 px-3" onClick={useNavigation}>
              Profile <FaLongArrowAltRight className="ml-2" size={20} />
            </button>
          </div>
        </div>
      </>
    );
};

export default Table;
