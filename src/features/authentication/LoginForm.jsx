//Import
import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import useLogin from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";
//Styles
//functions outside of Component

function LoginForm() {
  //Variables and Hooks
  const [email, setEmail] = useState("liujovin@gmail.com");
  const [password, setPassword] = useState("pass1234");
  const { login, isLoading } = useLogin();
  //Handlers
  //NOTE:用户是如果登陆进去的？？？登陆分为两部authentication和autherizaiton
  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    const user = { email, password };
    //NOTE:1.这里调用了login，把email和password传到了login中
    login(user, {
      onSettled: () => {
        setEmail("");
        setPassword("");
      },
    });
  }
  //JSX
  return (
    <Form onSubmit={handleSubmit} type="regular">
      <FormRowVertical label="Email address" orientation="vertical">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical label="Password" orientation="vertical">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical orientation="vertical">
        <Button size="large">{isLoading ? <SpinnerMini /> : "Login"}</Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
