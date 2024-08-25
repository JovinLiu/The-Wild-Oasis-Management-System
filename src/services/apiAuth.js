import supabase, { supabaseUrl } from "./supabase";

export async function login(user) {
  const { data, error } = await supabase.auth.signInWithPassword(user);
  if (error) throw new Error(error.message);

  return data;
}

//NOTE:7.这里为什么要再次获取current user呢，上面不是登陆的时候已经获得用户数据了？这里是为了保证在登陆之后，比如过了几天，再次登陆，不用再输入登陆信息，就可以直接进入到app中
export async function getCurrentUser() {
  //NOTE:8.第一步先从chrome本地查看是否有之前还没过期的登陆信息，上面的login之后的登陆信息就会存在本地。这里用supabase.auth来获取
  const { data: session } = await supabase.auth.getSession();
  //NOTE:9.如果没有有效的用户信息，就返回无。就是说这一步本地没有上次的登陆信息，useUser提供的数据就直接是isAuthenticated为假，protectedRoute就不允许直接进入app了，就会重新导航回登陆页面/login。就要重新进行authentication
  if (!session.session) return null;
  //NOTE:10.如果有用户信息，就证明上次登陆还没过期，为了安全起见（比如如果本地还有登陆信息，但是对方在这期间把密码改了，就必须重新下载用户信息，不去使用localstorage中的用户信息，这样更安全），当再次返回从服务器端的用户信息时。我们要根据这个用户信息来确认是否允许用户进入app
  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function signup({ email, password, fullName }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function updateUser(user) {
  //avatar有两种情况，一种是'' 一种是文件
  const fileName = user.id ? `avatar-${user.id}-${Math.random()}` : "";
  const isFileUploaded = Boolean(user.avatar);
  let avatarUrl = "";
  let newData;

  if (isFileUploaded)
    avatarUrl = `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`;

  if (user.fullName && isFileUploaded)
    newData = { data: { fullName: user.fullName, avatar: avatarUrl } };
  if (user.fullName && !isFileUploaded)
    newData = { data: { fullName: user.fullName } };
  if (user.password) newData = user;

  const { data, error } = await supabase.auth.updateUser(newData);

  if (error) throw new Error(error.message);

  if (isFileUploaded) {
    const { error: storageError } = await supabase.storage
      .from("avatars")
      .upload(fileName, user.avatar);
    if (storageError) throw new Error(error.message);
  }

  return data;
}
