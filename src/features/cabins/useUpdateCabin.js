import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useUpdateCabin() {
  const queryClient = useQueryClient();
  const { mutate: updateCabin, isLoading: isEditing } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "cabins" });
      toast.success("New Cabin is successfully edited");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { updateCabin, isEditing };
}

export default useUpdateCabin;
