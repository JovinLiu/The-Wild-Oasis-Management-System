//Import
import { updateUser as updateUserApi } from "../../services/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
//Styles
//functions outside of Component
function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateUserApi,
    onSuccess: (user) => {
      // console.log(user);
      queryClient.invalidateQueries({ queryKey: "user" });
      toast.success("The user has been successfully updated");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  console.log(queryClient);

  return { updateUser, isUpdating };
}

export default useUpdateUser;
