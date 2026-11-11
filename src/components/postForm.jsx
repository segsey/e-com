import React from "react";
import axios from "axios";
import InputComponent from "../page/formComponents/inputComponent";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import "rsuite/dist/rsuite.css";
import { Form, ButtonToolbar, Button } from "rsuite";

const PostForm = () => {
  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup
      .string()
      .min(6, "Description must be at least 6 characters")
      .required("Description is required"),
    price: yup
      .number()
      .typeError("Please enter a valid number")
      .min(1, "Price must be at least 1")
      .required("Price is required"),
    category: yup
      .string()
      .min(1, "Category must be at least 1")
      .required("Category is required"),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      category: "",
      password: "",
      dob: null,
    },
  });

  const submit = async (data) => {
    try {
      const pushed = await axios.post(
        "https://fakestoreapi.com/products",
        data,
      );
      console.log(pushed);
    } catch (error) {
      console.error("Error pushing product", error);
    }
  };

  return (
    <div className="mt-4 mb-4 w-100">
      <h2>Item Creation Form</h2>
      <Form onSubmit={handleSubmit(submit)} className="d-flex flex-column">
        <Form.Stack>
          <InputComponent
            control={control}
            name="title"
            type="text"
            label={"Title"}
            error={errors.title?.message}
          />
          <InputComponent
            control={control}
            name="description"
            type="text"
            label={"description"}
            error={errors.description?.message}
          />
          <InputComponent
            control={control}
            name="price"
            type="number"
            label={"price"}
            error={errors.price?.message}
          />
          <InputComponent
            control={control}
            name="category"
            type="text"
            label={"category"}
            error={errors.category?.message}
          />
        </Form.Stack>
        <ButtonToolbar className="mt-3">
          <Button appearance="primary" type="submit">
            Submit
          </Button>
        </ButtonToolbar>
      </Form>
    </div>
  );
};

export default PostForm;
