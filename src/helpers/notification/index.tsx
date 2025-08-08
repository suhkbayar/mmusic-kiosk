import { Toast } from 'flowbite-react';
import { HiX, HiExclamation, HiCheck } from 'react-icons/hi';
import { CgClose } from 'react-icons/cg';
import useNotificationStore from '../../contexts/notificationStore';

const typeConfig = {
  error: {
    icon: <HiX className="h-5 w-5" />,
    iconBg: 'bg-red-100',
    iconText: 'text-red-500',
    darkIconBg: 'dark:bg-red-800',
    darkIconText: 'dark:text-red-200',
  },
  warning: {
    icon: <HiExclamation className="h-5 w-5" />,
    iconBg: 'bg-macDonald',
    iconText: 'text-macDonald',
    darkIconBg: 'dark:bg-macDonald',
    darkIconText: 'dark:text-macDonald',
  },
  success: {
    icon: <HiCheck className="h-5 w-5" />,
    iconBg: 'bg-green-100',
    iconText: 'text-green-500',
    darkIconBg: 'dark:bg-green-800',
    darkIconText: 'dark:text-green-200',
  },
};

export const Notification = () => {
  const { type, message, hideNotification } = useNotificationStore();

  const { icon, iconBg, iconText, darkIconBg, darkIconText } = typeConfig[type] || {};

  if (type === null) return;

  return (
    <Toast className="absolute top-4 right-4 z-[100]  drop-shadow-xl place-content-between">
      <div
        className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${iconBg} ${iconText} ${darkIconBg} ${darkIconText}`}
      >
        {icon}
      </div>
      <div className="ml-3 text-sm font-normal">{message}</div>
      <div className="text-lg">
        <CgClose onClick={hideNotification} />
      </div>
    </Toast>
  );
};
