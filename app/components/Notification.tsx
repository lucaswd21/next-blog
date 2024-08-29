import { useEffect, useState } from 'react';

interface NotificationProps {
  isOpen: boolean;
  message: string;
  color: string;
  duration?: number;
  onClose: () => void;
}

export default function Notification({ isOpen, message, color, duration = 3000, onClose }: NotificationProps) {
  const [visible, setVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(() => {
          onClose();
        }, 300);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  return visible ? (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 ${color} text-white text-base px-4 py-2 rounded shadow-lg transition-opacity duration-300 z-50 ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`}
    >
      <div>{message}</div>
    </div>
  ) : null;
}
