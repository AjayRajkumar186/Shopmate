import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { useNotifications } from "../context/NotificationContext";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const { addNotification } = useNotifications();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = (e) => {
    e.preventDefault();

    // Add to notifications context
    addNotification({
      name: formData.name,
      phone: formData.phone,
      message: formData.message,
      createdAt: new Date().toISOString(),
    });

    // Send Email
    emailjs
      .send(
        import.meta.env.VITE_EMAIL_SERVICE_ID,
        import.meta.env.VITE_EMAIL_TEMPLATE_ID,
        {
          name: formData.name,
          phone: formData.phone,
          message: formData.message,
        },
        import.meta.env.VITE_EMAIL_PUBLIC_KEY
      )
      .then(() => {
        alert("Message sent successfully ✅");
        setFormData({ name: "", phone: "", message: "" });
      });
  };



  return (
   <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
  <form
    onSubmit={handleSubmit}
    className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
  >
    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
      Contact Us
    </h2>

    {/* Name */}
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
        Name
      </label>
      <input
        type="text"
        name="name"
        required
        value={formData.name}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                   bg-white dark:bg-gray-700
                   text-gray-900 dark:text-white
                   focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>

    {/* Phone */}
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
        Phone
      </label>
      <input
        type="tel"
        name="phone"
        required
        value={formData.phone}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                   bg-white dark:bg-gray-700
                   text-gray-900 dark:text-white
                   focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>

    {/* Message */}
    <div className="mb-6">
      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
        Message
      </label>
      <textarea
        name="message"
        rows="4"
        required
        value={formData.message}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                   bg-white dark:bg-gray-700
                   text-gray-900 dark:text-white
                   focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>

    <button
      type="submit"
      className="w-full bg-indigo-600 hover:bg-indigo-700
                 text-white py-2 rounded-lg font-semibold transition"
    >
      Send Message
    </button>
  </form>
</div>

  );
};

export default Contact;
