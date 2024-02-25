import React, { useState } from "react";
import { useRecordsContext } from "../context/RecordProvider";
import Table from "./Table";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    dob: "",
    address: {
      city: "",
      district: "",
      province: "",
      country: "Nepal",
    },
  });
  const [errors, setErrors] = useState({});
  const { addRecord } = useRecordsContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "city" || name === "district" || name === "province") {
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [name]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!validatePhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number";
    }
    if (!formData.dob.trim()) {
      newErrors.dob = "Date of birth is required";
    }
    if (!formData.address.city.trim()) {
      newErrors.city = "City is required";
    }
    if (!formData.address.district.trim()) {
      newErrors.district = "District is required";
    }
    if (!formData.address.province.trim()) {
      newErrors.province = "Province is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      addRecord(formData);
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        dob: "",
        address: {
          city: "",
          district: "",
          province: "",
          country: "Nepal",
        },
      });
      setErrors({});
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const re = /^\d{7,}$/;
    return re.test(phoneNumber);
  };

  return (
    <>
      <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-md mb-4 shadow-md">
        <h2 className="text-2xl text-center font-semibold font-serif mb-4">
          Enter Details
        </h2>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name:<span className="text-red-500">*</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
              {errors.name && (
                <span className="text-red-500 font-serif">{errors.name}</span>
              )}
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email:<span className="text-red-500">*</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
              {errors.email && (
                <span className="text-red-500 font-serif">{errors.email}</span>
              )}
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Phone Number:<span className="text-red-500">*</span>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
              {errors.phoneNumber && (
                <span className="text-red-500 font-serif">
                  {errors.phoneNumber}
                </span>
              )}
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Date of Birth:<span className="text-red-500">*</span>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
              {errors.dob && (
                <span className="text-red-500 font-serif">{errors.dob}</span>
              )}
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              City:<span className="text-red-500">*</span>
              <input
                type="text"
                name="city"
                value={formData.address.city}
                onChange={(e) =>
                  handleChange({
                    target: { name: "city", value: e.target.value },
                  })
                }
                className="mt-1 p-2 w-full border rounded-md"
              />
              {errors.city && (
                <span className="text-red-500 font-serif">{errors.city}</span>
              )}
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              District:<span className="text-red-500">*</span>
              <input
                type="text"
                name="district"
                value={formData.address.district}
                onChange={(e) =>
                  handleChange({
                    target: { name: "district", value: e.target.value },
                  })
                }
                className="mt-1 p-2 w-full border rounded-md"
              />
              {errors.district && (
                <span className="text-red-500 font-serif">
                  {errors.district}
                </span>
              )}
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Province:<span className="text-red-500">*</span>
              <select
                name="province"
                value={formData.address.province || ""}
                onChange={(e) =>
                  handleChange({
                    target: { name: "province", value: e.target.value },
                  })
                }
                className="mt-1 p-2 w-full border rounded-md"
              >
                <option value="">Select Province</option>
                {[1, 2, 3, 4, 5, 6, 7].map((province) => (
                  <option key={province} value={province}>
                    Province {province}
                  </option>
                ))}
              </select>
              {errors.province && (
                <span className="text-red-500 font-serif">
                  {errors.province}
                </span>
              )}
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Country:
              <span className="pl-4 text-gray-700">
                {formData.address.country}🇳🇵
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="bg-blue-500 mb-4 text-white p-2 rounded-md block mx-auto w-40 hover:bg-blue-600 transition duration-300"
          >
            Add Record
          </button>
        </form>
      </div>
      <Table />
    </>
  );
};

export default LoginForm;
