import React, { useEffect } from 'react';

const Notification = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

  return (
    <div className={`notification fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 font-medium`}>
      {message}
    </div>
  );
};

export default Notification;