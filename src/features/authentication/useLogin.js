//Import
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { createBookings, deleteBookings } from "../../data/Uploader";
//Styles

//functions outside of Component
function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isLoading } = useMutation({
    //NOTE:2.从loginform传过来的user信息会进入apiAuth提供的loginApi中
    mutationFn: (user) => loginApi(user),
    onSuccess: async (data) => {
      await deleteBookings();
      await createBookings();
      //NOTE:3.当在后端证明用户信息正确时，返回了从服务器发来的用户信息，信息data包含两部分，一是user（用户信息），一是session（本次登陆信息），这里将登陆的user信息使用setQueryData放入react query cache中，就不需要再通过getCurrentUser来获取user了。在localStorage中存储的登陆信息user和session都有
      queryClient.setQueryData(["user"], data.user);
      //NOTE:4.并且导航到根目录下，激活protected route（激活authorization环节）
      navigate("/", { replace: true });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { login, isLoading };
}

export default useLogin;
