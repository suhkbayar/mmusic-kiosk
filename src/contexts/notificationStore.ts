import create from 'zustand';

export type NotificationType = 'error' | 'warning' | 'success';

type NotificationState = {
  visible: boolean;
  alertType: NotificationType | null;
  type: NotificationType | null;
  title?: string;
  message: string | null;
  showNotification: (type: NotificationType, message: string) => void;
  hideNotification: () => void;
  onCloseAlert: () => void;
  showAlert: (visible: boolean, alertType: NotificationType, message: string, title: string) => void;
};

const useNotificationStore = create<NotificationState>((set) => ({
  type: null,
  alertType: null,
  title: null,
  message: null,
  visible: false,
  showNotification: (type, message) => {
    set({ type, message });
    setTimeout(() => {
      set({ type: null, message: null });
    }, 5000);
  },
  showAlert: (visible, alertType, message, title) => {
    set({ visible, alertType, message, title });
  },

  hideNotification: () => set({ type: null, message: null }),
  onCloseAlert: () => set({ visible: false, alertType: null, message: null, title: null }),
}));

export default useNotificationStore;
