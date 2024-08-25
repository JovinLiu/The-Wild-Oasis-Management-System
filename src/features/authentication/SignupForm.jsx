import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormItem from "../../ui/FormItem";
import Input from "../../ui/Input";
import useSignup from "./useSignup";
import SpinnerMini from "../../ui/SpinnerMini";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
    reset,
  } = useForm();
  const { signup, isLoading } = useSignup();

  function onSubmit(data) {
    signup(data, {
      onSettled: () => {
        reset();
      },
    });
  }

  function onError(error) {
    console.error(error.message);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type="regular">
      <FormItem label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isLoading}
          {...register("fullName", { required: "This field is required" })}
        />
      </FormItem>

      <FormItem label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isLoading}
          {...register("email", {
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
            required: "This field is required",
          })}
        />
      </FormItem>

      <FormItem
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          disabled={isLoading}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password must be more then 8 characters",
            },
          })}
        />
      </FormItem>

      <FormItem
        label="Repeat password"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isLoading}
          {...register("passwordConfirm", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password must be more then 8 characters",
            },
            validate: (value) =>
              value === getValues().password || "Passwords need to match",
          })}
        />
      </FormItem>

      <FormItem>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" disabled={isLoading}>
          Cancel
        </Button>
        <Button disabled={isLoading}>
          {isLoading ? <SpinnerMini /> : "Create new user"}
        </Button>
      </FormItem>
    </Form>
  );
}

export default SignupForm;
