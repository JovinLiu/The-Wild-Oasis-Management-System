//Import
import { signup as signupApi } from "../../services/apiAuth";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

//Styles
//functions outside of Component
function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (data) => {
      toast.success(
        "Account successfully created! Please verify the new account from the user's email address."
      );
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { signup, isLoading };
}

export default useSignup;
