import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormItem from "../../ui/FormItem";
import SpinnerMini from "../../ui/SpinnerMini";
import useCreateCabin from "./useCreateCabin";
import useUpdateCabin from "./useUpdateCabin";

function CreateCabinForm({ cabin = {}, id, onCloseModal }) {
  const isEditSession = Boolean(id);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm({ defaultValues: cabin });

  const { createCabin, isCreating } = useCreateCabin();
  const { updateCabin, isEditing } = useUpdateCabin();
  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    isEditSession
      ? updateCabin(data, {
          onSuccess: () => {
            reset();
            onCloseModal();
          },
        })
      : createCabin(data, {
          onSuccess: () => {
            reset();
            onCloseModal();
          },
        });
  }

  function onError(error) {
    console.error(error);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormItem label="Cabin Name" error={errors?.name?.message}>
        <Input
          type="text"
          disabled={isWorking}
          id="name"
          {...register("name", {
            required: "This field is required.",
            maxLength: {
              value: 30,
              message: "Name should be not more than 30 characters.",
            },
          })}
        />
      </FormItem>

      <FormItem label="Maximum Capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          disabled={isWorking}
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required.",
            min: { value: 1, message: "The capacity should be at least 1." },
            max: {
              value: 20,
              message: "The capacity should be less than 20.",
            },
          })}
        />
      </FormItem>

      <FormItem label="Regular Price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          disabled={isWorking}
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required.",
            min: {
              value: 0,
              message: "The value should be equal to or greater than 0.",
            },
          })}
        />
      </FormItem>

      <FormItem label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          disabled={isWorking}
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required.",
            min: {
              value: 0,
              message: "The value should be equal to or greater than 0.",
            },
            validate: (value) =>
              value <= Number(getValues().regularPrice) ||
              "Discount should be less than regular price",
          })}
        />
      </FormItem>

      <FormItem label="Description" error={errors?.description?.message}>
        <Textarea
          type="number"
          disabled={isWorking}
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This field is required.",
            maxLength: {
              value: 1000,
              message: "The description should be less than 1000 characters",
            },
          })}
        />
      </FormItem>

      <FormItem label="Cabin photo" error={errors?.image?.message}>
        {/* 这里可以添加type="file"来修改Fileinput的功能 */}
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: !id ? "This field is required" : false,
          })}
          disabled={isWorking}
        />
      </FormItem>

      <FormItem>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          disabled={isWorking}
          onClick={onCloseModal}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isWorking ? (
            <SpinnerMini />
          ) : isEditSession ? (
            "Submit"
          ) : (
            "Create a cabin"
          )}
        </Button>
      </FormItem>
    </Form>
  );
}

export default CreateCabinForm;
