import React from "react";
import { useNotifications } from "../context/NotificationContext";
import { FiTrash2, FiCheck, FiPhone, FiBellOff } from "react-icons/fi";


const Notifications = () => {
  const {
    notifications,
    markAsRead,
    deleteNotification,
    clearNotifications,
  } = useNotifications();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold dark:text-white">
            Notifications
          </h2>

          {notifications.length > 0 && (
            <button
              onClick={clearNotifications}
              className="text-red-500 hover:text-red-600"
            >
              Clear All
            </button>
          )}
        </div>

        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-10 text-gray-500 dark:text-gray-400">
            <FiBellOff size={48} className="mb-2" />
            <p className="text-center text-sm">No notifications</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((item) => (
              <div
                key={item.id}
                className={`p-4 rounded-lg border
                ${item.read
                    ? "bg-gray-100 dark:bg-gray-700"
                    : "bg-indigo-50 dark:bg-indigo-900 border-indigo-400"
                  }`}
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold dark:text-white">
                    {item.name}
                  </h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(item.createdAt).toLocaleString()}
                  </span>
                </div>

                <p className="text-sm mt-1 dark:text-gray-300 flex items-center gap-2">
                  <FiPhone className="text-indigo-500" />
                  {item.phone}
                </p>

                <p className="mt-2 dark:text-gray-200">
                  {item.message}
                </p>

                <div className="flex gap-3 mt-3">
                  {!item.read && (
                    <button
                      onClick={() => markAsRead(item.id)}
                      className="text-green-600 text-sm flex items-center gap-1"
                    >
                      <FiCheck /> Mark as read
                    </button>
                  )}

                  <button
                    onClick={() => deleteNotification(item.id)}
                    className="text-red-500 text-sm flex items-center gap-1"
                  >
                    <FiTrash2 /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
