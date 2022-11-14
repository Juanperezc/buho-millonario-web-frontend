import { toast } from "react-toastify";

export const toastError = (message: string) => {
    console.log('toast', message)
  toast.error(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};
