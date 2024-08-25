//Import
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
//Styles

//functions outside of Component
function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  //Variables and Hooks
  //Handlers
  //JSX
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/", { replace: true });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { logout, isLoading };
}

export default useLogout;
