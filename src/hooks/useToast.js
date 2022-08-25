import { toast } from "react-toastify";

let useToast = () => {
  let toastFn = (fn, pending, success, error) => {
    toast.promise(fn, {
      pending: pending,
      success: success,
      error: error,
    });
  };

  return toastFn;
};

export default useToast;
