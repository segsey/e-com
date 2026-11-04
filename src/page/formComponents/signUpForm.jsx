import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import InputComponent from "./inputComponent";
import "rsuite/dist/rsuite.css";
import {
  Form,
  PasswordInput,
  Radio,
  ButtonToolbar,
  Button,
  RadioGroup,
  DatePicker,
} from "rsuite";

const SignUpForm = () => {
  const schema = yup.object().shape({
    firstName: yup
      .string()
      .trim()
      .min(1, "Please enter a valid name")
      .required("Your First Name is required for this registration"),
    lastName: yup
      .string()
      .trim()
      .min(1, "Please enter a valid name")
      .required("Your Last Name is required for this registration"),
    gender: yup.string().required("Please Select if you are a male or female"),
    dob: yup.date().required("Date of Birth is Required"),
    email: yup
      .string()
      .trim()
      .email("Invalid Email Format")
      .required("Email is Required"),
    password: yup
      .string()
      .trim()
      .min(6, "Password cannot be less than 6 Characters")
      .required("Password is Requrired"),
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      password: "",
      dob: null,
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="w-md-75 mx-auto">
      <h2 className="ms-4 my-2">Sign Up</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="row justify-content-center align-items-center g-3">
          <InputComponent
            label="First Name:"
            name="firstName"
            classList="col-11 col-md-6"
            error={errors.firstName?.message}
            register={register}
          />
          <InputComponent
            label="Last Name:"
            name="lastName"
            classList="col-11 col-md-6"
            error={errors.lastName?.message}
            register={register}
          />
          <InputComponent
            label="Email:"
            name="email"
            classList="col-11 col-md-6"
            error={errors.email?.message}
            register={register}
          />
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <InputComponent
                classList="col-11 col-md-6"
                name="gender"
                value={field.value ?? ""}
                onChange={field.onChange}
                label="Gender:"
                error={errors.gender?.message}
                accepter={RadioGroup}
                inline
              >
                <Radio value="Male">Male</Radio>
                <Radio value="Female">Female</Radio>
              </InputComponent>
            )}
          />
          <InputComponent
            label="Password:"
            name="password"
            classList="col-11 col-md-6"
            error={errors.password?.message}
            accepter={PasswordInput}
            register={register}
          />
          <Controller
            name="dob"
            control={control}
            render={({ field }) => (
              <InputComponent
                name="dob"
                classList="col-11 col-md-6"
                value={field.value ?? null}
                onChange={field.onChange}
                error={errors.dob?.message}
                label="Date Of Birth:"
                accepter={DatePicker}
              />
            )}
          />
        </div>
        <ButtonToolbar className="mt-3">
          <Button appearance="primary" type="submit">
            Submit
          </Button>
          <Button appearance="default">Cancel</Button>
        </ButtonToolbar>
      </Form>
    </div>
  );
};

export default SignUpForm;
