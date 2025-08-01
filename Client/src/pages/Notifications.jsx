import React, { useEffect, useState } from "react";
import API from "../services/api";
import "./Notifications.css"; // Import the CSS file

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await API.get("/notifications");
        setNotifications(res.data);
      } catch (err) {
        console.error("Error fetching notifications:", err);
      }
    };
    fetchNotifications();
  }, []);

  return (
    <div className="notifications-container container mt-4">
      <h2 className="notifications-title">Notifications</h2>
      {notifications.length === 0 && <p className="no-notifications">No notifications yet.</p>}
      {notifications.map((n) => (
        <div key={n._id} className="notification-card card p-3 mb-3 shadow-sm">
          <p className="notification-message">{n.message}</p>
        </div>
      ))}
    </div>
  );
};

export default Notifications;