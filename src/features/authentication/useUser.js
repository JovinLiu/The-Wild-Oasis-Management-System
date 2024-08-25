//Import
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";
//Styles

//functions outside of Component
function useUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    //NOTE:6.通过下面的getCurrentUser获取用户信息
    queryFn: getCurrentUser,
  });
  //NOTE:11.这里我们只看data中的user的role这个property是不是authenticated，是的话，返回true
  const isAuthenticated = user?.role === "authenticated";

  return { isLoading, user, isAuthenticated };
}

export default useUser;
