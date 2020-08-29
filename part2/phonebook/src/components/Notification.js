import React from "react";

const Notification = ({ text, look }) => {
  const styles = () => {
    if (look === "green") {
      return "py-2 px-6 text-gray-100 bg-green-600 rounded";
    } else if (look === "yellow") {
      return "py-2 px-6 text-gray-100 bg-yellow-400 rounded";
    } else if (look === "red") {
      return "py-2 px-6 text-gray-100 bg-red-500 rounded";
    } else {
      return "py-2 px-6 text-gray-100 bg-gray-900 rounded";
    }
  };
  return (
    <div className={styles()}>
      <span>{text}</span>
    </div>
  );
};

export default Notification;
