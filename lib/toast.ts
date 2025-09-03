import toast from 'react-hot-toast';

// Custom toast function that respects the current theme
export const customToast = (message: string, options?: any) => {
  return toast(message, options);
};

// Success toast
export const successToast = (message: string) => {
  return toast.success(message);
};

// Error toast
export const errorToast = (message: string) => {
  return toast.error(message);
};

// Loading toast
export const loadingToast = (message: string) => {
  return toast.loading(message);
}; 