import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormItem from "../../ui/FormItem";
import Input from "../../ui/Input";

import useUser from "./useUser";
import useUpdateUser from "./useUpdateUser";

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    user: {
      id,
      email,
      user_metadata: { fullName: currentFullName, avatar: currentAvatar },
    },
  } = useUser();

  const { updateUser, isUpdating } = useUpdateUser();

  const [fullName, setFullName] = useState(currentFullName || "");
  const [avatar, setAvatar] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!fullName) return;
    const newData = {
      id,
      fullName,
      avatar,
    };

    updateUser(newData, {
      onSuccess: () => {
        setAvatar("");
        e.target.reset();
      },
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormItem>
        Email address
        <Input value={email} disabled />
      </FormItem>
      <FormItem label="Full name">
        <Input
          type="text"
          value={fullName}
          disabled={isUpdating}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
        />
      </FormItem>
      <FormItem label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          disabled={isUpdating}
          onChange={(e) => {
            setAvatar(e.target.files[0]);
          }}
        />
      </FormItem>
      <FormItem>
        <Button type="reset" variation="secondary" disabled={isUpdating}>
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update account</Button>
      </FormItem>
    </Form>
  );
}

export default UpdateUserDataForm;
