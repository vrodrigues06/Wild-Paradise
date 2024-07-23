import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";
import React from "react";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
    trigger,
    watch,
    setValue,
  } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditSession)
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: () => onCloseModal(),
        }
      );
    else {
      createCabin(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset();
            onCloseModal();
          },
        }
      );
      reset();
    }
  }

  function onError(error) {
    console.log(error);
  }

  const regularPrice = watch("regularPrice", 0);
  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow error={errors?.name?.message} label="Cabin name">
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "a name for cabin is required",
          })}
          onBlur={() => trigger("name")}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "the max capacity of cabin is required",
            min: {
              value: 1,
              message: "Capacity should at least 1",
            },
          })}
          onBlur={() => trigger("maxCapacity")}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "a Price for cabin is required",
          })}
          onBlur={() => {
            setValue("regularPrice", getValues("regularPrice"));
            trigger(["regularPrice", "discount"]);
          }}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            validate: (value) =>
              parseFloat(value) < regularPrice ||
              "Discount should be less than regular price",
          })}
          onBlur={() => trigger("discount")}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "description for cabin is required",
          })}
          onBlur={() => trigger("description")}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "A Image for cabin is required",
          })}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset" onClick={onCloseModal}>
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
